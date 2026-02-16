/**
 * Seed Data SQL Generator
 *
 * Reads all JSON seed data files and generates a complete seed.sql file
 * with INSERT statements in the correct order (respecting FK constraints).
 *
 * Run with: npx tsx seed-data/generate-seed-sql.ts
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a short ID like "family-01" to a deterministic UUID using SHA-256. */
function shortIdToUuid(id: string): string {
  const hash = crypto.createHash("sha256").update(id).digest("hex");
  // Format as UUID v4-shaped string (version nibble = 4, variant nibble = a)
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    "4" + hash.slice(13, 16),
    "a" + hash.slice(16, 19),
    hash.slice(19, 31),
  ].join("-");
}

/** Escape a string for use inside a SQL single-quoted literal. */
function esc(value: string): string {
  return value.replace(/'/g, "''");
}

/** Return a SQL literal for a value (null-aware). */
function sqlVal(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (typeof value === "number") return String(value);
  return `'${esc(String(value))}'`;
}

/** Read and parse a JSON file from the seed-data directory. */
function readJson<T>(filename: string): T {
  const filePath = path.join(__dirname, filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

// ---------------------------------------------------------------------------
// Types (matching the JSON files)
// ---------------------------------------------------------------------------

interface Family {
  id: string;
  family_name: string;
  display_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

interface Member {
  id: string;
  family_id: string;
  family_role: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  birthday: string;
  gender: string;
  member_status: string;
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  meeting_day: string;
  meeting_time: string;
  meeting_location: string;
  leader_id: string;
}

interface CommunityGroupMember {
  community_group_id: string;
  member_id: string;
}

interface Ministry {
  id: string;
  name: string;
  description: string;
  category: string;
  contact_id: string;
}

interface MinistryMember {
  ministry_id: string;
  member_id: string;
  role: string;
}

interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
}

interface ForumPost {
  id: string;
  category_id: string;
  author_id: string;
  title: string;
  slug: string;
  body: string;
  status: string;
  is_pinned: boolean;
  is_locked: boolean;
}

interface ForumComment {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  body: string;
}

interface ForumReaction {
  id: string;
  profile_id: string;
  post_id: string | null;
  comment_id: string | null;
  reaction_type: string;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  // Read all data
  const families = readJson<Family[]>("families.json");
  const members = readJson<Member[]>("members.json");
  const communityGroups = readJson<CommunityGroup[]>("community-groups.json");
  const communityGroupMembers = readJson<CommunityGroupMember[]>(
    "community-group-members.json"
  );
  const ministries = readJson<Ministry[]>("ministries.json");
  const ministryMembers = readJson<MinistryMember[]>("ministry-members.json");
  const forumCategories = readJson<ForumCategory[]>("forum-categories.json");
  const forumPosts = readJson<ForumPost[]>("forum-posts.json");
  const forumComments = readJson<ForumComment[]>("forum-comments.json");
  const forumReactions = readJson<ForumReaction[]>("forum-reactions.json");

  const lines: string[] = [];

  const emit = (s: string) => lines.push(s);
  const blank = () => lines.push("");

  emit("-- ==========================================================================");
  emit("-- Redeemer Church Directory – Seed Data");
  emit(`-- Generated on ${new Date().toISOString()}`);
  emit("-- Run with: psql $DATABASE_URL < supabase/seed.sql");
  emit("-- ==========================================================================");
  blank();
  emit("BEGIN;");
  blank();

  // ------------------------------------------------------------------
  // 1. auth_allowlist
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- auth_allowlist");
  emit("-- --------------------------------------------------------------------------");
  const emails = new Set<string>();
  for (const m of members) {
    if (m.email) emails.add(m.email);
  }
  for (const email of emails) {
    emit(
      `INSERT INTO auth_allowlist (email) VALUES (${sqlVal(email)}) ON CONFLICT DO NOTHING;`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 2. families
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- families");
  emit("-- --------------------------------------------------------------------------");
  for (const f of families) {
    const uuid = shortIdToUuid(f.id);
    emit(
      `INSERT INTO families (id, family_name, display_name, address, city, state, zip, phone, email) VALUES (` +
        `'${uuid}', ${sqlVal(f.family_name)}, ${sqlVal(f.display_name)}, ${sqlVal(f.address)}, ` +
        `${sqlVal(f.city)}, ${sqlVal(f.state)}, ${sqlVal(f.zip)}, ${sqlVal(f.phone)}, ${sqlVal(f.email)});`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 3. members (without profile_id for now)
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- members");
  emit("-- --------------------------------------------------------------------------");
  for (const m of members) {
    const uuid = shortIdToUuid(m.id);
    const familyUuid = shortIdToUuid(m.family_id);
    emit(
      `INSERT INTO members (id, family_id, family_role, first_name, last_name, email, phone, birthday, gender, member_status) VALUES (` +
        `'${uuid}', '${familyUuid}', '${m.family_role}', ${sqlVal(m.first_name)}, ${sqlVal(m.last_name)}, ` +
        `${sqlVal(m.email)}, ${sqlVal(m.phone)}, ${sqlVal(m.birthday)}, '${m.gender}', '${m.member_status}');`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 4. community_groups
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- community_groups");
  emit("-- --------------------------------------------------------------------------");
  for (const g of communityGroups) {
    const uuid = shortIdToUuid(g.id);
    const leaderUuid = shortIdToUuid(g.leader_id);
    emit(
      `INSERT INTO community_groups (id, name, description, meeting_day, meeting_time, meeting_location, leader_id) VALUES (` +
        `'${uuid}', ${sqlVal(g.name)}, ${sqlVal(g.description)}, ${sqlVal(g.meeting_day)}, ` +
        `${sqlVal(g.meeting_time)}, ${sqlVal(g.meeting_location)}, '${leaderUuid}');`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 5. community_group_members
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- community_group_members");
  emit("-- --------------------------------------------------------------------------");
  for (const cgm of communityGroupMembers) {
    const groupUuid = shortIdToUuid(cgm.community_group_id);
    const memberUuid = shortIdToUuid(cgm.member_id);
    emit(
      `INSERT INTO community_group_members (community_group_id, member_id) VALUES (` +
        `'${groupUuid}', '${memberUuid}');`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 6. ministries
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- ministries");
  emit("-- --------------------------------------------------------------------------");
  for (const min of ministries) {
    const uuid = shortIdToUuid(min.id);
    const contactUuid = shortIdToUuid(min.contact_id);
    emit(
      `INSERT INTO ministries (id, name, description, category, contact_id) VALUES (` +
        `'${uuid}', ${sqlVal(min.name)}, ${sqlVal(min.description)}, ${sqlVal(min.category)}, '${contactUuid}');`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 7. ministry_members
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- ministry_members");
  emit("-- --------------------------------------------------------------------------");
  for (const mm of ministryMembers) {
    const ministryUuid = shortIdToUuid(mm.ministry_id);
    const memberUuid = shortIdToUuid(mm.member_id);
    emit(
      `INSERT INTO ministry_members (ministry_id, member_id, role) VALUES (` +
        `'${ministryUuid}', '${memberUuid}', ${sqlVal(mm.role)});`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 8. forum_categories
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- forum_categories");
  emit("-- --------------------------------------------------------------------------");
  for (const fc of forumCategories) {
    const uuid = shortIdToUuid(fc.id);
    emit(
      `INSERT INTO forum_categories (id, name, slug, description, icon, color, sort_order) VALUES (` +
        `'${uuid}', ${sqlVal(fc.name)}, ${sqlVal(fc.slug)}, ${sqlVal(fc.description)}, ` +
        `${sqlVal(fc.icon)}, ${sqlVal(fc.color)}, ${fc.sort_order});`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 9. profiles (for forum authors)
  // ------------------------------------------------------------------
  // Forum posts, comments, and reactions reference profiles (auth.users).
  // In seed mode we create stub profiles using the member UUID as the
  // profile id.  This requires a matching row in auth.users, so we insert
  // into auth.users first using Supabase's raw schema.
  // NOTE: These are placeholder auth rows. Real users will be created via
  // the app's sign-up flow. The seed profiles let the forum data load
  // without FK violations.
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- profiles (for forum authors)");
  emit("-- NOTE: We insert stub auth.users rows so the profiles FK is satisfied.");
  emit("-- These are NOT real login accounts. Real users are created via sign-up.");
  emit("-- --------------------------------------------------------------------------");

  // Collect all member IDs that are referenced as forum authors or reactors
  const forumMemberIds = new Set<string>();
  for (const p of forumPosts) forumMemberIds.add(p.author_id);
  for (const c of forumComments) forumMemberIds.add(c.author_id);
  for (const r of forumReactions) forumMemberIds.add(r.profile_id);

  // Build a lookup: member short id -> member record
  const memberMap = new Map<string, Member>();
  for (const m of members) memberMap.set(m.id, m);

  // Determine which member is admin (member-01, head of family-01)
  const adminMemberId = "member-01";

  for (const memberId of forumMemberIds) {
    const member = memberMap.get(memberId);
    if (!member || !member.email) continue;
    const uuid = shortIdToUuid(memberId);
    const role = memberId === adminMemberId ? "admin" : "member";
    const displayName = `${member.first_name} ${member.last_name}`;

    // Insert into auth.users (Supabase internal table)
    emit(
      `INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, aud, role, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES (` +
        `'${uuid}', '00000000-0000-0000-0000-000000000000', ${sqlVal(member.email)}, ` +
        `'$2a$10$seedhashplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', now(), 'authenticated', 'authenticated', ` +
        `'{"provider":"email","providers":["email"]}', '{"display_name":${JSON.stringify(displayName)}}', ` +
        `now(), now(), '', ''` +
        `) ON CONFLICT (id) DO NOTHING;`
    );
    // Insert profile
    emit(
      `INSERT INTO profiles (id, email, role, display_name, is_onboarded) VALUES (` +
        `'${uuid}', ${sqlVal(member.email)}, '${role}', ${sqlVal(displayName)}, TRUE) ` +
        `ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, display_name = EXCLUDED.display_name, is_onboarded = EXCLUDED.is_onboarded;`
    );
    // Link profile to member
    emit(
      `UPDATE members SET profile_id = '${uuid}' WHERE id = '${uuid}';`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 10. forum_posts
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- forum_posts");
  emit("-- --------------------------------------------------------------------------");
  for (const p of forumPosts) {
    const uuid = shortIdToUuid(p.id);
    const categoryUuid = shortIdToUuid(p.category_id);
    const authorUuid = shortIdToUuid(p.author_id);
    // Count comments for this post
    const commentCount = forumComments.filter(
      (c) => c.post_id === p.id
    ).length;
    emit(
      `INSERT INTO forum_posts (id, category_id, author_id, title, slug, body, status, is_pinned, is_locked, comment_count) VALUES (` +
        `'${uuid}', '${categoryUuid}', '${authorUuid}', ${sqlVal(p.title)}, ${sqlVal(p.slug)}, ` +
        `${sqlVal(p.body)}, '${p.status}', ${sqlVal(p.is_pinned)}, ${sqlVal(p.is_locked)}, ${commentCount});`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 11. forum_comments
  // ------------------------------------------------------------------
  // Insert comments in two passes: first those without parent_id, then
  // those with parent_id (to satisfy FK on self-referencing column).
  emit("-- --------------------------------------------------------------------------");
  emit("-- forum_comments");
  emit("-- --------------------------------------------------------------------------");
  const topLevel = forumComments.filter((c) => !c.parent_id);
  const replies = forumComments.filter((c) => c.parent_id);
  for (const c of [...topLevel, ...replies]) {
    const uuid = shortIdToUuid(c.id);
    const postUuid = shortIdToUuid(c.post_id);
    const authorUuid = shortIdToUuid(c.author_id);
    const parentUuid = c.parent_id ? `'${shortIdToUuid(c.parent_id)}'` : "NULL";
    emit(
      `INSERT INTO forum_comments (id, post_id, author_id, parent_id, body) VALUES (` +
        `'${uuid}', '${postUuid}', '${authorUuid}', ${parentUuid}, ${sqlVal(c.body)});`
    );
  }
  blank();

  // ------------------------------------------------------------------
  // 12. forum_reactions
  // ------------------------------------------------------------------
  emit("-- --------------------------------------------------------------------------");
  emit("-- forum_reactions");
  emit("-- --------------------------------------------------------------------------");
  for (const r of forumReactions) {
    const uuid = shortIdToUuid(r.id);
    const profileUuid = shortIdToUuid(r.profile_id);
    const postUuid = r.post_id ? `'${shortIdToUuid(r.post_id)}'` : "NULL";
    const commentUuid = r.comment_id
      ? `'${shortIdToUuid(r.comment_id)}'`
      : "NULL";
    emit(
      `INSERT INTO forum_reactions (id, profile_id, post_id, comment_id, reaction_type) VALUES (` +
        `'${uuid}', '${profileUuid}', ${postUuid}, ${commentUuid}, ${sqlVal(r.reaction_type)});`
    );
  }
  blank();

  emit("COMMIT;");
  blank();
  emit("-- ==========================================================================");
  emit("-- End of seed data");
  emit("-- ==========================================================================");

  // Write to supabase/seed.sql
  const outPath = path.join(__dirname, "..", "supabase", "seed.sql");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf-8");

  console.log(`Seed SQL written to ${outPath}`);
  console.log(`  Families:               ${families.length}`);
  console.log(`  Members:                ${members.length}`);
  console.log(`  Community groups:       ${communityGroups.length}`);
  console.log(`  Community group members: ${communityGroupMembers.length}`);
  console.log(`  Ministries:             ${ministries.length}`);
  console.log(`  Ministry members:       ${ministryMembers.length}`);
  console.log(`  Forum categories:       ${forumCategories.length}`);
  console.log(`  Forum profiles:         ${forumMemberIds.size}`);
  console.log(`  Forum posts:            ${forumPosts.length}`);
  console.log(`  Forum comments:         ${forumComments.length}`);
  console.log(`  Forum reactions:        ${forumReactions.length}`);
  console.log(`  Auth allowlist emails:  ${emails.size}`);
}

main();
