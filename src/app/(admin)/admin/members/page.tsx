import { createClient } from "@/lib/supabase/server";
import { fetchAll } from "@/lib/supabase/fetch-all";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { RoleManager } from "@/components/admin/role-manager";
import { AdminPeopleTable } from "@/components/admin/admin-people-table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Manage Directory | Admin | Redeemer Church",
};

export default async function AdminMembersPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  const members = await fetchAll(supabase, "members", {
    select: "*, families(family_name)",
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
        {/* Profiles with roles */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-4">
              User Accounts ({profiles?.length || 0})
            </h3>
            <div className="space-y-3">
              {profiles?.map((profile) => {
                const nameParts = (profile.display_name || profile.email).split(" ");
                return (
                  <div
                    key={profile.id}
                    className="flex items-center gap-3 p-3 bg-neutral-50 rounded-md"
                  >
                    <Avatar
                      firstName={nameParts[0]}
                      lastName={nameParts[1] || ""}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {profile.display_name || profile.email}
                      </p>
                      <p className="text-xs text-neutral-700 truncate">
                        {profile.email}
                      </p>
                    </div>
                    <RoleManager profileId={profile.id} currentRole={profile.role} isSelf={profile.id === user?.id} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* People list */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-4">
              Directory People ({members.length})
            </h3>
            <AdminPeopleTable members={members as any} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
