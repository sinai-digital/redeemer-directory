import Link from "next/link";
import { Phone, Mail, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatPhone } from "@/lib/utils/format";
import type { Family } from "@/lib/types";

interface FamilyCardProps {
  family: Family;
  variant?: "grid" | "list";
}

export function FamilyCard({ family, variant = "grid" }: FamilyCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/directory/family/${family.id}`}>
        <Card hover className="print-break-inside-avoid">
          <div className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-950 truncate">
                {family.display_name}
              </p>
              {family.address && (
                <p className="text-sm text-neutral-700 truncate">
                  {family.address}, {family.city}, {family.state}
                </p>
              )}
            </div>
            <div className="hidden sm:flex items-center gap-4 text-sm text-neutral-700">
              {family.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {formatPhone(family.phone)}
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/directory/family/${family.id}`} className="h-full">
      <Card hover className="print-break-inside-avoid h-full">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-950 text-lg font-heading">
                {family.display_name}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 text-sm text-neutral-700">
            {family.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{formatPhone(family.phone)}</span>
              </div>
            )}
            {family.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{family.email}</span>
              </div>
            )}
            {family.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {family.address}, {family.city}, {family.state} {family.zip}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
