import { getMinistry } from "@/lib/actions/directory";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { ministry } = await getMinistry(id);
    return {
      title: `${ministry.name} | Redeemer Church Directory`,
    };
  } catch {
    return { title: "Ministry Not Found" };
  }
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await getMinistry(id);
  } catch {
    notFound();
  }

  const { ministry, contact, members } = data;

  return (
    <div>
      <Link
        href="/directory?tab=ministries"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Ministries
      </Link>

      <div className="space-y-6">
        {/* Ministry Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-bold font-heading">{ministry.name}</h1>
              <div className="flex items-center gap-2">
                {ministry.category && (
                  <Badge variant="muted">{ministry.category}</Badge>
                )}
                <Badge variant="accent">{members.length} members</Badge>
              </div>
            </div>

            {ministry.description && (
              <p className="text-sm text-neutral-700 mt-3">{ministry.description}</p>
            )}

            {contact && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Contact Person
                </p>
                <Link
                  href={`/directory/member/${contact.id}`}
                  className="flex items-center gap-3 hover:bg-neutral-50 rounded-md p-2 -mx-2 transition-colors"
                >
                  <Avatar
                    firstName={contact.first_name}
                    lastName={contact.last_name}
                    size="md"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      {contact.first_name} {contact.last_name}
                    </p>
                  </div>
                  <User className="h-4 w-4 text-primary-700 ml-auto" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Members List */}
        <Card>
          <CardContent className="pt-5">
            <h2 className="text-lg font-semibold font-heading mb-4">Members</h2>
            <div className="divide-y divide-neutral-200">
              {members.map((member: any) => (
                <Link
                  key={member.id}
                  href={`/directory/member/${member.id}`}
                  className="flex items-center gap-3 py-3 hover:bg-neutral-50 rounded-md px-2 -mx-2 transition-colors"
                >
                  <Avatar
                    firstName={member.first_name}
                    lastName={member.last_name}
                    size="sm"
                  />
                  <span className="text-sm font-medium">
                    {member.first_name} {member.last_name}
                  </span>
                  {member.role && member.role !== "member" && (
                    <Badge variant="primary" className="ml-auto">{member.role}</Badge>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
