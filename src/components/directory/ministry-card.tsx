import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Ministry } from "@/lib/types";

interface MinistryCardProps {
  ministry: Ministry & { ministry_members?: { count: number }[] };
}

const categoryColors: Record<string, string> = {
  worship: "primary",
  care: "accent",
  education: "success",
  outreach: "warning",
  leadership: "default",
};

export function MinistryCard({ ministry }: MinistryCardProps) {
  const memberCount = ministry.ministry_members?.[0]?.count || 0;
  const badgeVariant = (categoryColors[ministry.category || ""] || "default") as
    | "primary"
    | "accent"
    | "success"
    | "warning"
    | "default";

  return (
    <Link href={`/directory/ministry/${ministry.id}`}>
    <Card className="print-break-inside-avoid hover:border-primary-300 hover:shadow-md transition-all cursor-pointer">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-neutral-950 font-heading">
            {ministry.name}
          </h3>
          <Badge variant={badgeVariant}>{memberCount} members</Badge>
        </div>

        {ministry.description && (
          <p className="text-sm text-neutral-700 mt-2">{ministry.description}</p>
        )}

        {ministry.category && (
          <div className="mt-3">
            <Badge variant="muted">{ministry.category}</Badge>
          </div>
        )}
      </div>
    </Card>
    </Link>
  );
}
