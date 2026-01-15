# qlynoibo-mkt

A small Next.js (App Router) marketing site built with TypeScript, Tailwind CSS, and shadcn/ui.

## Local development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Supabase setup

1. Create a Supabase project and grab the project URL and anon key.
2. Run the SQL in [`supabase/schema.sql`](supabase/schema.sql) to create tables and RLS policies.
3. Configure the environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
