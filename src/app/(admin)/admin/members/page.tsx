import { createClient } from "@/lib/supabase/server";
import { fetchAll } from "@/lib/supabase/fetch-all";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AdminPeopleTable, type MemberRow } from "@/components/admin/admin-people-table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Manage Directory | Admin | Redeemer Church",
};

export default async function AdminMembersPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const members = await fetchAll<MemberRow>(supabase, "members", {
    select: "*, families(family_name), profiles!members_profile_id_fkey(id, role, is_onboarded)",
    modify: (q) => q.order("sort_name"),
  });

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to admin
      </Link>

      <PageHeader
        title="Manage Directory"
        description="View and manage people, profiles, and roles"
      />

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-4">
              Directory People ({members.length})
            </h3>
            <AdminPeopleTable members={members} currentUserId={user?.id ?? null} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
