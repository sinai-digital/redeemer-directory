import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar } from "lucide-react";
import type { CommunityGroup } from "@/lib/types";

interface GroupCardProps {
  group: CommunityGroup & { community_group_members?: { count: number }[] };
}

export function GroupCard({ group }: GroupCardProps) {
  const memberCount = group.community_group_members?.[0]?.count || 0;

  return (
    <Link href={`/directory/group/${group.id}`}>
    <Card className="print-break-inside-avoid hover:border-primary-300 hover:shadow-md transition-all cursor-pointer">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-neutral-950 font-heading">
            {group.name}
          </h3>
          <Badge variant="accent">{memberCount} members</Badge>
        </div>

        {group.description && (
          <p className="text-sm text-neutral-700 mt-2">{group.description}</p>
        )}

        <div className="mt-3 space-y-1.5 text-sm text-neutral-700">
          {group.meeting_day && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{group.meeting_day}s</span>
            </div>
          )}
          {group.meeting_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{group.meeting_time}</span>
            </div>
          )}
          {group.meeting_location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{group.meeting_location}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
    </Link>
  );
}
