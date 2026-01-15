create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text not null check (role in ('leader', 'content', 'video', 'design')),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null default 'other' check (type in ('content', 'video', 'design', 'ads', 'other')),
  status text not null default 'backlog' check (status in ('backlog', 'todo', 'in_progress', 'review', 'done')),
  priority integer not null default 3,
  assignee_id uuid references public.profiles(id),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  label text not null,
  url text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_leader()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.profiles where id = auth.uid() and role = 'leader'
  );
$$;

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.comments enable row level security;
alter table public.links enable row level security;

create policy "Profiles are viewable by authenticated users"
  on public.profiles
  for select
  to authenticated
  using (true);

create policy "Users can update their profile"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Leader can manage profiles"
  on public.profiles
  for all
  to authenticated
  using (public.is_leader())
  with check (public.is_leader());

create policy "Tasks are readable by authenticated users"
  on public.tasks
  for select
  to authenticated
  using (true);

create policy "Leader can manage tasks"
  on public.tasks
  for all
  to authenticated
  using (public.is_leader())
  with check (public.is_leader());

create policy "Assignees can update tasks"
  on public.tasks
  for update
  to authenticated
  using (assignee_id = auth.uid())
  with check (assignee_id = auth.uid());

create policy "Comments are readable by authenticated users"
  on public.comments
  for select
  to authenticated
  using (true);

create policy "Assignees can manage comments"
  on public.comments
  for all
  to authenticated
  using (
    public.is_leader()
    or exists (
      select 1 from public.tasks
      where public.tasks.id = comments.task_id
        and public.tasks.assignee_id = auth.uid()
    )
  )
  with check (
    public.is_leader()
    or exists (
      select 1 from public.tasks
      where public.tasks.id = comments.task_id
        and public.tasks.assignee_id = auth.uid()
    )
  );

create policy "Links are readable by authenticated users"
  on public.links
  for select
  to authenticated
  using (true);

create policy "Assignees can manage links"
  on public.links
  for all
  to authenticated
  using (
    public.is_leader()
    or exists (
      select 1 from public.tasks
      where public.tasks.id = links.task_id
        and public.tasks.assignee_id = auth.uid()
    )
  )
  with check (
    public.is_leader()
    or exists (
      select 1 from public.tasks
      where public.tasks.id = links.task_id
        and public.tasks.assignee_id = auth.uid()
    )
  );
