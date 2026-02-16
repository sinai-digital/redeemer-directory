import { getCommunityGroup } from "@/lib/actions/directory";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Calendar, Crown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { group } = await getCommunityGroup(id);
    return {
      title: `${group.name} | Redeemer Church Directory`,
    };
  } catch {
    return { title: "Group Not Found" };
  }
}

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await getCommunityGroup(id);
  } catch {
    notFound();
  }

  const { group, leader, members } = data;

  return (
    <div>
      <Link
        href="/directory?tab=groups"
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Groups
      </Link>

      <div className="space-y-6">
        {/* Group Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-bold font-heading">{group.name}</h1>
              <Badge variant="accent">{members.length} members</Badge>
            </div>

            {group.description && (
              <p className="text-sm text-neutral-700 mt-3">{group.description}</p>
            )}

            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              {group.meeting_day && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>{group.meeting_day}s</span>
                </div>
              )}
              {group.meeting_time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{group.meeting_time}</span>
                </div>
              )}
              {group.meeting_location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{group.meeting_location}</span>
                </div>
              )}
            </div>

            {leader && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Leader
                </p>
                <Link
                  href={`/directory/member/${leader.id}`}
                  className="flex items-center gap-3 hover:bg-neutral-50 rounded-md p-2 -mx-2 transition-colors"
                >
                  <Avatar
                    firstName={leader.first_name}
                    lastName={leader.last_name}
                    size="md"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      {leader.first_name} {leader.last_name}
                    </p>
                  </div>
                  <Crown className="h-4 w-4 text-accent-400 ml-auto" />
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
                  {leader && member.id === leader.id && (
                    <Badge variant="accent" className="ml-auto">Leader</Badge>
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
