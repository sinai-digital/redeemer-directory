import { getMember } from "@/lib/actions/directory";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatPhone, formatDate } from "@/lib/utils/format";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Users, Heart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { member } = await getMember(id);
    return {
      title: `${member.first_name} ${member.last_name} | Redeemer Church Directory`,
    };
  } catch {
    return { title: "Member Not Found" };
  }
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await getMember(id);
  } catch {
    notFound();
  }

  const { member, communityGroups, ministries } = data;
  const family = member.families;

  return (
    <div>
      <Link
        href={`/directory/family/${member.family_id}`}
        className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {family?.display_name || "family"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center">
            <Avatar
              firstName={member.first_name}
              lastName={member.last_name}
              size="xl"
              className="mx-auto"
            />
            <h1 className="text-xl font-bold font-heading mt-4">
              {member.first_name} {member.last_name}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge variant="primary">{member.family_role}</Badge>
              <Badge variant="muted">{member.member_status}</Badge>
            </div>

            {family && (
              <Link
                href={`/directory/family/${family.id}`}
                className="block mt-3 text-sm text-primary-800 hover:underline"
              >
                {family.display_name}
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-lg font-semibold font-heading mb-4">
                Contact Information
              </h2>
              <div className="space-y-3 text-sm">
                {member.show_phone && member.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-neutral-700 shrink-0" />
                    <a
                      href={`tel:${member.phone}`}
                      className="text-primary-800 hover:underline"
                    >
                      {formatPhone(member.phone)}
                    </a>
                  </div>
                )}
                {member.show_email && member.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-neutral-700 shrink-0" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary-800 hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
                {member.show_address && family?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
                    <span>
                      {family.address}
                      <br />
                      {family.city}, {family.state} {family.zip}
                    </span>
                  </div>
                )}
                {member.show_birthday && member.birthday && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-neutral-700 shrink-0" />
                    <span>{formatDate(member.birthday)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Community Groups */}
          {communityGroups.length > 0 && (
            <Card>
              <CardContent className="pt-5">
                <h2 className="text-lg font-semibold font-heading mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-800" />
                  Community Groups
                </h2>
                <div className="space-y-2">
                  {communityGroups.map((group: any) => (
                    <div
                      key={group.id}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-md"
                    >
                      <span className="font-medium text-sm">{group.name}</span>
                      {group.meeting_day && (
                        <span className="text-xs text-neutral-700">
                          {group.meeting_day}s
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ministries */}
          {ministries.length > 0 && (
            <Card>
              <CardContent className="pt-5">
                <h2 className="text-lg font-semibold font-heading mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary-800" />
                  Ministries
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ministries.map((ministry: any) => (
                    <Badge key={ministry.id} variant="primary">
                      {ministry.name}
                      {ministry.role && ministry.role !== "member" && (
                        <span className="ml-1 opacity-70">
                          ({ministry.role})
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
