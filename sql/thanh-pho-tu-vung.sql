-- Thành phố Cá Voi: lưu số lần đúng/sai từng từ của mỗi người chơi (để ôn từ yếu khi đổi máy) và bảng "Từ cả lớp hay sai" cho cô.
-- Dán vào Supabase → SQL Editor → Run (chạy lại được). Cần đã chạy thanh-pho-nguoi-choi.sql trước.
-- Riêng tư: học sinh chỉ đọc được dữ liệu của chính email mình; cô (chủ web) xem được tổng hợp cả lớp.
create table if not exists public.city_words(
  email text not null, word text not null check (char_length(word) between 1 and 40),
  c int not null default 0, x int not null default 0, box int not null default 1, last date,
  updated_at timestamptz not null default now(), primary key(email,word));
alter table public.city_words enable row level security;

create or replace function public.save_city_words(p_email text,p_words jsonb) returns void
language plpgsql security definer set search_path=public as $$
declare e text:=lower(trim(p_email)); r record; n int:=0;
begin
  if e !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or jsonb_typeof(p_words)<>'array' then raise exception 'invalid'; end if;
  for r in select * from jsonb_to_recordset(p_words) as t(w text,c int,x int,b int,l text) loop
    n:=n+1; exit when n>600;
    continue when r.w is null or r.w='';
    insert into public.city_words(email,word,c,x,box,last)
    values(e,left(r.w,40),greatest(0,least(coalesce(r.c,0),100000)),greatest(0,least(coalesce(r.x,0),100000)),greatest(1,least(coalesce(r.b,1),4)),nullif(r.l,'')::date)
    on conflict(email,word) do update set c=greatest(city_words.c,excluded.c),x=greatest(city_words.x,excluded.x),
      box=case when excluded.last>=coalesce(city_words.last,'1970-01-01') then excluded.box else city_words.box end,
      last=greatest(city_words.last,excluded.last),updated_at=now();
  end loop;
end $$;

create or replace function public.load_city_words(p_email text) returns table(w text,c int,x int,b int,l date)
language sql security definer set search_path=public as $$
  select word,c,x,box,last from public.city_words where email=lower(trim(p_email)) limit 2000 $$;

create or replace function public.admin_city_words() returns table(word text,wrong bigint,right_n bigint,students bigint,wrong_students bigint)
language plpgsql security definer set search_path=public as $$
begin
  if not public.rw_is_owner() then raise exception 'forbidden'; end if;
  return query select w.word,sum(w.x)::bigint,sum(w.c)::bigint,count(*)::bigint,count(*) filter (where w.x>w.c)::bigint
    from public.city_words w group by w.word having sum(w.x)>0 order by count(*) filter (where w.x>w.c) desc,sum(w.x) desc limit 60;
end $$;
grant execute on function public.save_city_words(text,jsonb), public.load_city_words(text) to anon, authenticated;
grant execute on function public.admin_city_words() to authenticated;
