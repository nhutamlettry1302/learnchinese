-- Đếm lượt truy cập web Rừng Cá Voi (chỉ chủ web xem được, trong trang Phòng học → Quản trị).
-- Dán vào Supabase → SQL Editor → Run (chạy lại được). Cần đã chạy supabase.sql và phong-hoc.sql trước (có hàm rw_is_owner).
-- Mỗi trình duyệt chỉ tính 1 lượt mỗi ngày cho mỗi trang. Không lưu tên, email hay IP.
create table if not exists public.rw_visits(
  id bigint generated always as identity primary key,
  day date not null,
  visitor text not null check (char_length(visitor) between 8 and 64),
  page text not null default '/' check (char_length(page) <= 60),
  created_at timestamptz not null default now(),
  unique(day,visitor,page));
alter table public.rw_visits enable row level security;   -- không tạo policy: chỉ truy cập qua hàm

create or replace function public.log_visit(p_visitor text,p_page text default '/') returns void
language sql security definer set search_path=public as $$
  insert into public.rw_visits(day,visitor,page) values((now() at time zone 'Asia/Ho_Chi_Minh')::date,left(p_visitor,64),left(coalesce(p_page,'/'),60)) on conflict do nothing $$;

create or replace function public.visit_stats() returns jsonb
language plpgsql security definer set search_path=public as $$
declare d0 date:=(now() at time zone 'Asia/Ho_Chi_Minh')::date;
begin
  if not public.rw_is_owner() then raise exception 'forbidden'; end if;
  return jsonb_build_object(
    'total',(select count(*) from rw_visits),
    'unique',(select count(distinct visitor) from rw_visits),
    'today',(select count(distinct visitor) from rw_visits where day=d0),
    'week',(select count(distinct visitor) from rw_visits where day>d0-7),
    'month',(select count(distinct visitor) from rw_visits where day>d0-30),
    'days',(select coalesce(jsonb_agg(jsonb_build_object('d',g::date,'n',(select count(distinct visitor) from rw_visits v where v.day=g::date)) order by g),'[]'::jsonb) from generate_series(d0-13,d0,'1 day') g),
    'pages',(select coalesce(jsonb_agg(x order by (x->>'n')::int desc),'[]'::jsonb) from (select jsonb_build_object('p',page,'n',count(*)) x from rw_visits where day>d0-30 group by page limit 12) s));
end $$;
grant execute on function public.log_visit(text,text) to anon, authenticated;
grant execute on function public.visit_stats() to authenticated;
