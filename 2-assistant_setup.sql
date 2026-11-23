-- المساعد الذكي: جدول محادثات الطلاب مع الإدارة
-- شغّله مرة واحدة في Supabase > SQL Editor
-- بعد التشغيل تشتغل محادثة المساعد الذكي في student.html وتظهر في admin.html

create table if not exists public.assistant_messages (
  id uuid primary key default gen_random_uuid(),
  student_code text not null,
  student_name text not null default '',
  sender text not null check (sender in ('student','admin')),
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists assistant_messages_code_idx
  on public.assistant_messages (student_code, created_at);

alter table public.assistant_messages enable row level security;

drop policy if exists "assistant_messages_read" on public.assistant_messages;
create policy "assistant_messages_read" on public.assistant_messages
  for select to anon using (true);

drop policy if exists "assistant_messages_write" on public.assistant_messages;
create policy "assistant_messages_write" on public.assistant_messages
  for insert to anon with check (true);
