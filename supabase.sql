-- Rừng Cá Voi Roxie: bảng xếp hạng theo lớp. Dán vào Supabase → SQL Editor → Run (chạy được nhiều lần).
-- Học sinh không cần tài khoản: chỉ cần tên + mã lớp. Mọi truy cập đi qua 3 hàm bên dưới, bảng không mở trực tiếp.

create table if not exists public.classes(
  code text primary key,                 -- mã lớp, viết HOA, ví dụ HSK3A
  name text not null,                    -- tên lớp hiển thị
  created_at timestamptz not null default now());

create table if not exists public.scores(
  id bigserial primary key,
  game text not null,
  class_code text not null references public.classes(code) on delete cascade on update cascade,
  player text not null check (char_length(player) between 1 and 24),
  score int not null check (score between 0 and 200000),
  created_at timestamptz not null default now());
create index if not exists scores_rank on public.scores(game,class_code,score desc);

alter table public.classes enable row level security;
alter table public.scores  enable row level security;   -- không tạo policy: chặn truy cập trực tiếp

create or replace function public.check_class(p_code text) returns text
language sql security definer set search_path=public as $$
  select name from public.classes where code=upper(trim(p_code)) limit 1 $$;

create or replace function public.submit_score(p_game text,p_code text,p_player text,p_score int) returns void
language plpgsql security definer set search_path=public as $$
declare c text:=upper(trim(p_code)); n text:=left(trim(p_player),24);
begin
  if n='' or p_score is null or p_score<0 or p_score>200000 then raise exception 'invalid'; end if;
  if not exists(select 1 from public.classes where code=c) then raise exception 'no class'; end if;
  -- chống gửi dồn: mỗi tên chỉ gửi 1 điểm / 8 giây
  if exists(select 1 from public.scores where game=p_game and class_code=c and lower(player)=lower(n) and created_at>now()-interval '8 seconds') then return; end if;
  insert into public.scores(game,class_code,player,score) values(p_game,c,n,p_score);
end $$;

create or replace function public.leaderboard(p_game text,p_code text,p_limit int default 10)
returns table(player text,best int,plays bigint)
language sql security definer set search_path=public as $$
  select (array_agg(player order by score desc))[1], max(score), count(*)
  from public.scores where game=p_game and class_code=upper(trim(p_code))
  group by lower(player) order by max(score) desc limit least(greatest(p_limit,1),50) $$;

grant execute on function public.check_class(text), public.submit_score(text,text,text,int), public.leaderboard(text,text,int) to anon, authenticated;

-- Tạo lớp (sửa mã và tên rồi chạy; thêm nhiều dòng tùy ý):
insert into public.classes(code,name) values ('HSK3A','HSK3 tối T3 T5'),('THU','Lớp thử') on conflict do nothing;

-- Dọn bảng xếp hạng mỗi tháng:  delete from public.scores where created_at < now() - interval '30 days';
-- Xóa riêng một lớp:            delete from public.scores where class_code='HSK3A';


-- ============ Trò Chém hoa quả: bộ từ do giáo viên soạn ============
create table if not exists public.game_sets(
  id bigint generated always as identity primary key,
  title text not null, lv text, items jsonb not null default '[]'::jsonb,
  published boolean not null default true, created_at timestamptz default now());
alter table public.game_sets enable row level security;   -- không tạo policy: chỉ truy cập qua các hàm bên dưới

create table if not exists public.rw_admin(pass text not null);
alter table public.rw_admin enable row level security;
-- ĐỔI mật khẩu giáo viên (chỉ chạy 1 lần, thay chữ DOI-MAT-KHAU-NAY):
insert into public.rw_admin(pass) select 'DOI-MAT-KHAU-NAY' where not exists(select 1 from public.rw_admin);

create or replace function public.rw_is_admin(p text) returns boolean
language sql security definer set search_path=public as $$ select exists(select 1 from public.rw_admin where pass=p and length(p)>=6) $$;

create or replace function public.list_sets() returns setof public.game_sets
language sql security definer set search_path=public as $$ select * from public.game_sets where published order by id $$;

create or replace function public.admin_list_sets(p_pass text) returns setof public.game_sets
language plpgsql security definer set search_path=public as $$
begin if not public.rw_is_admin(p_pass) then raise exception 'sai mat khau'; end if;
  return query select * from public.game_sets order by id; end $$;

create or replace function public.admin_save_set(p_pass text,p_id bigint,p_title text,p_lv text,p_items jsonb,p_pub boolean) returns void
language plpgsql security definer set search_path=public as $$
begin if not public.rw_is_admin(p_pass) then raise exception 'sai mat khau'; end if;
  if p_id is null then insert into public.game_sets(title,lv,items,published) values(left(p_title,120),left(p_lv,20),p_items,p_pub);
  else update public.game_sets set title=left(p_title,120),lv=left(p_lv,20),items=p_items,published=p_pub where id=p_id; end if; end $$;

create or replace function public.admin_delete_set(p_pass text,p_id bigint) returns void
language plpgsql security definer set search_path=public as $$
begin if not public.rw_is_admin(p_pass) then raise exception 'sai mat khau'; end if;
  delete from public.game_sets where id=p_id; end $$;

grant execute on function public.list_sets(), public.admin_list_sets(text), public.admin_save_set(text,bigint,text,text,jsonb,boolean), public.admin_delete_set(text,bigint) to anon, authenticated;
revoke execute on function public.rw_is_admin(text) from anon, authenticated, public;
