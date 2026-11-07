-- Thành phố Cá Voi: tài khoản người chơi (email + tên) và lưu thành tích, cấp độ. Dán vào Supabase → SQL Editor → Run (chạy lại được).
-- Không cần mã lớp. Mỗi người chơi là một dòng theo email. Chỉ lưu số liệu gọn (cấp, EXP, sao, số địa điểm, huy hiệu).
-- Xu, đồ, skin vẫn lưu trên máy học sinh. Cần đã chạy supabase.sql trước (có hàm rw_is_admin cho phần giáo viên).

create table if not exists public.city_players(
  email text primary key check (char_length(email) between 5 and 120),
  player text not null check (char_length(player) between 1 and 24),
  level int not null default 1,
  exp int not null default 0,
  stars int not null default 0,
  places int not null default 0,
  extra jsonb not null default '{}'::jsonb,
  first_seen timestamptz not null default now(),
  updated_at timestamptz not null default now());
create index if not exists city_players_rank on public.city_players(exp desc);
alter table public.city_players enable row level security;   -- không tạo policy: chỉ truy cập qua hàm

create or replace function public.save_city(p_email text,p_player text,p_level int,p_exp int,p_stars int,p_places int,p_extra jsonb) returns void
language plpgsql security definer set search_path=public as $$
declare e text:=lower(trim(p_email)); n text:=left(trim(p_player),24);
begin
  if n='' or e !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or p_exp is null or p_exp<0 or p_exp>2000000 then raise exception 'invalid'; end if;
  insert into public.city_players(email,player,level,exp,stars,places,extra)
  values(e,n,greatest(1,least(p_level,500)),p_exp,greatest(0,least(coalesce(p_stars,0),5000)),greatest(0,least(coalesce(p_places,0),200)),coalesce(p_extra,'{}'::jsonb))
  on conflict(email) do update set
    player=excluded.player,
    level=greatest(public.city_players.level,excluded.level),
    stars=greatest(public.city_players.stars,excluded.stars),
    places=greatest(public.city_players.places,excluded.places),
    extra=case when excluded.exp>=public.city_players.exp then excluded.extra else public.city_players.extra end,
    exp=greatest(public.city_players.exp,excluded.exp),
    updated_at=now();
end $$;

create or replace function public.load_city(p_email text)
returns table(player text,level int,exp int,stars int,places int,extra jsonb)
language sql security definer set search_path=public as $$
  select player,level,exp,stars,places,extra from public.city_players where email=lower(trim(p_email)) $$;

-- Bảng xếp hạng chung (không lộ email)
create or replace function public.city_board(p_limit int default 10)
returns table(player text,level int,exp int,stars int,places int)
language sql security definer set search_path=public as $$
  select player,level,exp,stars,places from public.city_players order by exp desc limit least(greatest(p_limit,1),50) $$;

-- Dành cho chủ web (đăng nhập tài khoản chủ web trong Phòng học → Quản trị): xem và quản lý người chơi
create or replace function public.admin_city_list()
returns table(email text,player text,level int,exp int,stars int,places int,extra jsonb,first_seen timestamptz,updated_at timestamptz)
language plpgsql security definer set search_path=public as $$
begin
  if not public.rw_is_owner() then raise exception 'forbidden'; end if;
  return query select c.email,c.player,c.level,c.exp,c.stars,c.places,c.extra,c.first_seen,c.updated_at from public.city_players c order by c.exp desc limit 5000;
end $$;
create or replace function public.admin_city_delete(p_email text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if not public.rw_is_owner() then raise exception 'forbidden'; end if;
  delete from public.city_players where email=lower(trim(p_email));
end $$;
grant execute on function public.save_city(text,text,int,int,int,int,jsonb), public.load_city(text), public.city_board(int) to anon, authenticated;
grant execute on function public.admin_city_list(), public.admin_city_delete(text) to authenticated;
