// One-off script: Clear all synced data for a fresh start
// Usage: node --env-file=.env.local scripts/clear-synced-data.js

const { createClient } = require("@supabase/supabase-js");

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  // 1. Delete synced members
  const { data: members, error: e1 } = await sb
    .from("members")
    .delete()
    .not("subsplash_person_id", "is", null)
    .select("id");

  if (e1) throw new Error(`Failed to delete members: ${e1.message}`);
  console.log(`Deleted ${members.length} synced members`);

  // 2. Delete synced families
  const { data: families, error: e2 } = await sb
    .from("families")
    .delete()
    .not("subsplash_household_id", "is", null)
    .select("id");

  if (e2) throw new Error(`Failed to delete families: ${e2.message}`);
  console.log(`Deleted ${families.length} synced families`);

  // 3. Delete all sync history
  const { data: history, error: e3 } = await sb
    .from("sync_history")
    .delete()
    .gte("id", "00000000-0000-0000-0000-000000000000")
    .select("id");

  if (e3) throw new Error(`Failed to delete sync_history: ${e3.message}`);
  console.log(`Deleted ${history.length} sync history entries`);

  console.log("\nDone. Synced data cleared for fresh start.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
