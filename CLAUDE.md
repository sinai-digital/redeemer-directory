# Redeemer Church Directory — Project Notes

## Supabase Database Access

The Supabase instance for this project is hosted at `fvmlpzfqdfdczdvcrxqp.supabase.co`.

### How to run data operations (INSERT, UPDATE, DELETE, SELECT)

Use `@supabase/supabase-js` with the **service role key** from `.env.local`. This bypasses RLS and works for all data operations on public tables, auth admin operations, and storage API calls.

```js
const { createClient } = require("@supabase/supabase-js");
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Data operations
await sb.from("table_name").update({ col: "value" }).eq("id", "...");

// Auth admin operations
await sb.auth.admin.updateUserById("uuid", { user_metadata: { ... } });

// Storage operations
await sb.storage.from("bucket").upload("path/file.jpg", blob);
```

### How to run DDL (CREATE POLICY, ALTER TABLE, TRUNCATE, etc.)

DDL cannot be run via the REST API. Options:

1. **Supabase SQL Editor** (Dashboard > SQL Editor) — paste SQL manually
2. **`psql`** — not currently installed on this machine
3. **Direct connection** (`db.*.supabase.co:5432`) — only resolves to IPv6, which is unreachable from this network. The connection pooler (`aws-0-us-east-1.pooler.supabase.com:6543`) may also have authentication propagation delays after password resets.

**Bottom line**: For data operations, use the JS client with service role key. For DDL, ask the user to run it in the SQL Editor or install `psql`.

## Tech Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS v4 (uses `@import "tailwindcss"` and `@theme inline` in globals.css)
- Supabase (auth, database, storage)
- Fonts: Literata (headings), Source Sans (body)
- Color palette: Navy primary (#22313f–#f0f4f8), Gold accent (#d4b030–#f7e47f), Neutral grays

## Forum (Hidden for Initial Launch)

Forum functionality is fully built (pages, components, server actions) but **hidden from navigation** for the initial directory launch. All forum code remains intact under `src/app/(app)/forum/`, `src/components/forum/`, `src/lib/actions/forum.ts`, and `src/app/(admin)/admin/forum/`.

**To re-enable the forum:**
1. `src/components/layout/sidebar.tsx` — Uncomment the Forum entry in `navItems`; re-add `MessageSquare` to the lucide-react import
2. `src/components/layout/bottom-nav.tsx` — Uncomment the Forum entry in `items`; re-add `MessageSquare` to the import
3. `src/app/(admin)/admin/page.tsx` — Uncomment the "Forum Posts" stat card and the "Moderate Forum" action card; change grid columns back to `lg:grid-cols-4`
4. Optionally update default redirects in `middleware.ts`, `auth.ts`, `page.tsx` back to `/forum` if forum should be the landing page
