import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatPhone } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { DirectoryMember } from "@/lib/types";

interface MemberCardProps {
  member: DirectoryMember;
  variant?: "grid" | "list";
}

export function MemberCard({ member, variant = "grid" }: MemberCardProps) {
  const familyRoleLabel = member.family_role === "child" ? "Child" : "";

  if (variant === "list") {
    return (
      <Link href={`/directory/member/${member.id}`}>
        <Card hover className="print-break-inside-avoid">
          <div className="flex items-center gap-4 p-4">
            <Avatar
              firstName={member.first_name}
              lastName={member.last_name}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-neutral-950 truncate">
                  {member.first_name} {member.last_name}
                </p>
                {familyRoleLabel && (
                  <Badge variant="muted">{familyRoleLabel}</Badge>
                )}
              </div>
              {member.family_display_name && (
                <p className="text-sm text-neutral-700 truncate">
                  {member.family_display_name}
                </p>
              )}
            </div>
            <div className="hidden sm:flex items-center gap-4 text-sm text-neutral-700">
              {member.show_phone && member.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {formatPhone(member.phone)}
                </span>
              )}
              {member.show_email && member.email && (
                <span className="flex items-center gap-1 truncate max-w-[200px]">
                  <Mail className="h-3.5 w-3.5" />
                  {member.email}
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/directory/member/${member.id}`} className="h-full">
      <Card hover className="print-break-inside-avoid h-full">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Avatar
              firstName={member.first_name}
              lastName={member.last_name}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-950">
                {member.first_name} {member.last_name}
              </p>
              {member.family_display_name && (
                <p className="text-sm text-neutral-700">
                  {member.family_display_name}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 space-y-1.5 text-sm text-neutral-700">
            {member.show_phone && member.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{formatPhone(member.phone)}</span>
              </div>
            )}
            {member.show_email && member.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
            )}
            {member.show_address && member.family_address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {member.family_address}, {member.family_city}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
