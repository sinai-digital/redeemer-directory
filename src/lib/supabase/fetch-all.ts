import type { SupabaseClient } from "@supabase/supabase-js";

const PAGE_SIZE = 1000;

/**
 * Fetches all rows from a Supabase table, paginating automatically.
 *
 * Supabase's PostgREST has a server-side max-rows cap (default 1000) that
 * `.limit()` cannot exceed. This helper uses `.range()` to request successive
 * pages of PAGE_SIZE rows until all rows are retrieved.
 *
 * Usage:
 *   const members = await fetchAll(supabase, "members", { modify: (q) => q.order("sort_name") });
 *   const families = await fetchAll(admin, "families");
 *   const membersWithFamily = await fetchAll(supabase, "members", {
 *     select: "*, families(family_name)",
 *     modify: (q) => q.order("sort_name"),
 *   });
 */
export async function fetchAll<T = any>(
  client: SupabaseClient,
  table: string,
  options?: {
    select?: string;
    modify?: (query: any) => any;
  }
): Promise<T[]> {
  const allRows: T[] = [];
  const selectClause = options?.select ?? "*";
  let from = 0;

  while (true) {
    let query = client.from(table).select(selectClause).range(from, from + PAGE_SIZE - 1);

    if (options?.modify) {
      query = options.modify(query);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data || data.length === 0) break;

    allRows.push(...(data as T[]));

    // If we got fewer than PAGE_SIZE rows, we've reached the end
    if (data.length < PAGE_SIZE) break;

    from += PAGE_SIZE;
  }

  return allRows;
}
