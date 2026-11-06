-- ===== Rừng Cá Voi: tài khoản + PHÒNG HỌC cho giáo viên =====
-- Chạy trong Supabase (project của Rừng Cá Voi) → SQL Editor → Run. Chạy lại nhiều lần vẫn an toàn.
-- Điều kiện: đã chạy supabase.sql trước đó (có bảng classes, scores và hàm rw_is_admin).
-- Mật khẩu giáo viên chính là mật khẩu trong bảng rw_admin (đã đặt khi chạy supabase.sql).

-- Hồ sơ người dùng (liên kết tài khoản đăng nhập)
create table if not exists public.rw_profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  role text not null default 'student' check (role in ('student','teacher')),
  created_at timestamptz not null default now());
alter table public.rw_profiles enable row level security;

-- Cấu hình phòng: mỗi phòng dùng 1 dòng trong classes (mã phòng = mã lớp) nên bảng xếp hạng cũ dùng lại được
create table if not exists public.room_cfg(
  code text primary key references public.classes(code) on delete cascade on update cascade,
  owner uuid not null references auth.users(id) on delete cascade,
  config jsonb not null default '{}'::jsonb,   -- {vocab:{HSK1:[1,2]}, gram:{HSK1:[1]}, games:[...], note:''}
  closed boolean not null default false,
  created_at timestamptz not null default now());
alter table public.room_cfg enable row level security;

alter table public.scores add column if not exists user_id uuid;

-- Hồ sơ của tôi (tự tạo nếu chưa có)
create or replace function public.rw_me(p_name text default '') returns json
language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid(); r public.rw_profiles;
begin
  if u is null then return null; end if;
  insert into public.rw_profiles(id,name) values(u,left(coalesce(nullif(trim(p_name),''),''),40)) on conflict(id) do nothing;
  if coalesce(trim(p_name),'')<>'' then update public.rw_profiles set name=left(trim(p_name),40) where id=u and name=''; end if;
  select * into r from public.rw_profiles where id=u;
  return json_build_object('id',r.id,'name',r.name,'role',r.role);
end $$;

-- Trở thành giáo viên (nhập mật khẩu giáo viên của Roxie)
create or replace function public.rw_become_teacher(p_pass text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'chua dang nhap'; end if;
  if not public.rw_is_admin(p_pass) then raise exception 'sai mat khau'; end if;
  insert into public.rw_profiles(id,role) values(auth.uid(),'teacher') on conflict(id) do update set role='teacher';
end $$;

create or replace function public.rw_is_teacher() returns boolean
language sql security definer set search_path=public as $$
  select exists(select 1 from public.rw_profiles where id=auth.uid() and role='teacher') $$;

-- Tạo phòng (chỉ giáo viên): trả về mã phòng 6 ký tự
create or replace function public.room_create(p_name text,p_config jsonb) returns text
language plpgsql security definer set search_path=public as $$
declare c text; i int:=0; ab text:='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
begin
  if not public.rw_is_teacher() then raise exception 'chi giao vien'; end if;
  loop
    c:=''; for k in 1..6 loop c:=c||substr(ab,1+floor(random()*length(ab))::int,1); end loop;
    exit when not exists(select 1 from public.classes where code=c);
    i:=i+1; if i>20 then raise exception 'khong tao duoc ma'; end if;
  end loop;
  insert into public.classes(code,name) values(c,left(coalesce(nullif(trim(p_name),''),'Phòng học'),60));
  insert into public.room_cfg(code,owner,config) values(c,auth.uid(),coalesce(p_config,'{}'::jsonb));
  return c;
end $$;

create or replace function public.room_update(p_code text,p_name text,p_config jsonb,p_closed boolean) returns void
language plpgsql security definer set search_path=public as $$
declare c text:=upper(trim(p_code));
begin
  if not exists(select 1 from public.room_cfg where code=c and owner=auth.uid()) then raise exception 'khong phai phong cua ban'; end if;
  update public.room_cfg set config=coalesce(p_config,config), closed=coalesce(p_closed,closed) where code=c;
  if coalesce(trim(p_name),'')<>'' then update public.classes set name=left(trim(p_name),60) where code=c; end if;
end $$;

create or replace function public.room_delete(p_code text) returns void
language plpgsql security definer set search_path=public as $$
declare c text:=upper(trim(p_code));
begin
  if not exists(select 1 from public.room_cfg where code=c and owner=auth.uid()) then raise exception 'khong phai phong cua ban'; end if;
  delete from public.classes where code=c;   -- xóa luôn cấu hình và điểm của phòng
end $$;

-- Học sinh (cả khách) vào phòng bằng mã: lấy tên và nội dung giáo viên đã chọn
create or replace function public.room_get(p_code text) returns json
language sql security definer set search_path=public as $$
  select json_build_object('code',r.code,'name',c.name,'config',r.config,'closed',r.closed)
  from public.room_cfg r join public.classes c on c.code=r.code where r.code=upper(trim(p_code)) $$;

-- Phòng của tôi (giáo viên)
create or replace function public.my_rooms() returns json
language sql security definer set search_path=public as $$
  select coalesce(json_agg(json_build_object('code',r.code,'name',c.name,'config',r.config,'closed',r.closed,'created',r.created_at,
    'plays',(select count(*) from public.scores s where s.class_code=r.code)) order by r.created_at desc),'[]'::json)
  from public.room_cfg r join public.classes c on c.code=r.code where r.owner=auth.uid() $$;

-- Kết quả của phòng (chỉ chủ phòng): mỗi học sinh, mỗi trò, điểm cao nhất, số lượt
create or replace function public.room_results(p_code text) returns json
language plpgsql security definer set search_path=public as $$
declare c text:=upper(trim(p_code));
begin
  if not exists(select 1 from public.room_cfg where code=c and owner=auth.uid()) then raise exception 'khong phai phong cua ban'; end if;
  return (select coalesce(json_agg(x),'[]'::json) from (
    select (array_agg(player order by score desc))[1] as player, game, max(score) as best, count(*) as plays, max(created_at) as last
    from public.scores where class_code=c group by lower(player),game order by lower((array_agg(player))[1]),game) x);
end $$;

-- Ghi điểm: như cũ, thêm user_id nếu đã đăng nhập
create or replace function public.submit_score(p_game text,p_code text,p_player text,p_score int) returns void
language plpgsql security definer set search_path=public as $$
declare c text:=upper(trim(p_code)); n text:=left(trim(p_player),24);
begin
  if n='' or p_score is null or p_score<0 or p_score>200000 then raise exception 'invalid'; end if;
  if not exists(select 1 from public.classes where code=c) then raise exception 'no class'; end if;
  if exists(select 1 from public.room_cfg where code=c and closed) then raise exception 'room closed'; end if;
  if exists(select 1 from public.scores where game=p_game and class_code=c and lower(player)=lower(n) and created_at>now()-interval '8 seconds') then return; end if;
  insert into public.scores(game,class_code,player,score,user_id) values(p_game,c,n,p_score,auth.uid());
end $$;

grant execute on function public.rw_me(text), public.rw_become_teacher(text), public.rw_is_teacher(),
  public.room_create(text,jsonb), public.room_update(text,text,jsonb,boolean), public.room_delete(text),
  public.room_get(text), public.my_rooms(), public.room_results(text), public.submit_score(text,text,text,int) to anon, authenticated;
