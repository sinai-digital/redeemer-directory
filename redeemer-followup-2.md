# Redeemer Directory — Follow-up Fixes #2

## Instructions

Plan all changes first, then execute. These are updates to the existing app.

**Important: You have access to the Supabase database via the credentials in `.env.local`.** For any database changes (migrations, seeding, truncating), execute them directly against the Supabase instance — do not leave SQL files for me to run manually.

## 1. Fix Avatar Upload — Supabase Storage Bucket Setup

The profile photo upload shows "Bucket not found" because the `avatars` storage bucket doesn't exist yet in Supabase.

Generate a SQL migration script I can run in the Supabase SQL Editor that:
- Creates the `avatars` bucket in Supabase Storage
- Sets it as a public bucket (so avatar URLs are accessible without auth tokens in image tags)
- Adds RLS policies: authenticated users can upload/update/delete their own avatar, anyone authenticated can read all avatars

The standard way to do this in SQL is:

```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own avatar" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anyone authenticated can view avatars" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'avatars');
```

Save this as `supabase/migrations/00007_storage_avatars.sql` AND run it directly against the Supabase instance using the connection credentials in `.env.local`. Also verify the upload code stores files in a path like `{user_id}/avatar.jpg` so the folder-based policies above work correctly. If the code uses a different path structure, either fix the code or fix the policies to match.

## 2. Redesign the Login Page

The login page is too dark and heavy — the solid dark navy background makes it feel oppressive. Redesign it:

- **Background**: Use a light/white base (like the church website's main content areas) instead of the solid dark navy. The dark navy color should be used as an accent, not the entire background.
- **Possible approach**: White or very light warm gray background. The login card itself can have a subtle border or soft shadow. Consider a dark navy header strip or band at the top with the logo (similar to how the church site uses the dark header). Or a subtle gradient from dark navy at the top fading to white/light below.
- **"Redeemer Church" text**: Should be white if on a dark background, or the dark navy if on a light background. It should NOT be black on a dark navy background — that's why it looks off now.
- **"Member Directory & Community"** subtitle: Same — ensure proper contrast with whatever background it sits on.
- **Logo**: Make it a bit larger — maybe 80-100px instead of whatever it currently is.
- **The login card**: Keep it clean white with the gold/amber "Send magic link" button. This part looks good already.
- **"Visit redeemerriverview.org" link**: Keep this, style it in the gold accent color.
- **Overall feel**: Should feel welcoming and light, like walking into a church lobby — not like a dark terminal. Look at the church website's content sections for the right balance. The dark navy is a framing/accent color, not the dominant surface color.

## 3. Reorder Forum Categories — General Discussion First

In the forum home page, reorder the categories so that **General Discussion** appears first (top-left position). The current order puts Prayer Requests first. Update the display order so it goes:
1. 💬 General Discussion
2. 🙏 Prayer Requests
3. 📖 Devotionals & Encouragement
4. 🤝 Recommendations & Referrals
5. 🎉 Fellowship & Social
6. 💼 Networking & Careers
7. 🍽️ Meal Trains & Care
8. 📢 Church Announcements

If the ordering is controlled by a `display_order` or `sort_order` column in the database, update the seed data and run the update directly against the database. If it's hardcoded or alphabetical, update the query or component to use this explicit order. Also update this in the "New Post" category selector dropdown so General Discussion appears first there too.

## 4. Remaining "Matt Patterson" Cleanup

There are still references to "Matt Patterson" visible in the app (I can see it in the profile page — "Matt Patterson" as the display name, and "matt.patterson@example.com" as the contact email). Do a thorough search of:
- The entire `seed.sql` file
- Any JSON seed data files
- All source files

Replace every remaining instance:
- "Matt Patterson" → "Matt Pike"  
- "Patterson" family → "Pike" family
- "matt.patterson@..." → "matt.pike@..."
- Any other Patterson references tied to this user

Also check the `profiles` table update — if the display name in the database still says Patterson, the seed data needs fixing. After updating the seed files, truncate all tables and re-run the seed SQL directly against the Supabase instance using the connection credentials in `.env.local`. Do not leave this as a manual step — execute it.
