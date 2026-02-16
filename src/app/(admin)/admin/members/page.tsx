import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { RoleManager } from "@/components/admin/role-manager";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Manage Members | Admin | Redeemer Church",
};

export default async function AdminMembersPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  const { data: members } = await supabase
    .from("members")
    .select("*, families(family_name)")
    .order("sort_name");

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
        title="Manage Members"
        description="View and manage member profiles and roles"
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
                    <RoleManager profileId={profile.id} currentRole={profile.role} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Members list */}
        <Card>
          <CardContent className="pt-5">
            <h3 className="font-semibold font-heading mb-4">
              Directory Members ({members?.length || 0})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                      Name
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                      Family
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                      Role
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                      Status
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-neutral-700">
                      Linked
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members?.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50"
                    >
                      <td className="py-2 px-3 font-medium">
                        {member.first_name} {member.last_name}
                      </td>
                      <td className="py-2 px-3 text-neutral-700">
                        {(member.families as any)?.family_name}
                      </td>
                      <td className="py-2 px-3">
                        <Badge variant="muted">{member.family_role}</Badge>
                      </td>
                      <td className="py-2 px-3">
                        <Badge
                          variant={
                            member.member_status === "active"
                              ? "success"
                              : "warning"
                          }
                        >
                          {member.member_status}
                        </Badge>
                      </td>
                      <td className="py-2 px-3">
                        {member.profile_id ? (
                          <Badge variant="success">Yes</Badge>
                        ) : (
                          <Badge variant="muted">No</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
