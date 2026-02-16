import { getFamily } from "@/lib/actions/directory";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPhone, formatDate } from "@/lib/utils/format";
import { ArrowLeft, Phone, Mail, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { family } = await getFamily(id);
    return { title: `${family.display_name} | Redeemer Church Directory` };
  } catch {
    return { title: "Family Not Found" };
  }
}

export default async function FamilyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data;
  try {
    data = await getFamily(id);
  } catch {
    notFound();
  }

  const { family, members } = data;

  return (
    <div>
      <Link href="/directory" className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <PageHeader title={family.display_name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Family Info */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-5">
            <h2 className="text-lg font-semibold font-heading mb-4">
              Contact Information
            </h2>
            <div className="space-y-3 text-sm">
              {family.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-neutral-700 shrink-0" />
                  <a
                    href={`tel:${family.phone}`}
                    className="text-primary-800 hover:underline"
                  >
                    {formatPhone(family.phone)}
                  </a>
                </div>
              )}
              {family.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-neutral-700 shrink-0" />
                  <a
                    href={`mailto:${family.email}`}
                    className="text-primary-800 hover:underline truncate"
                  >
                    {family.email}
                  </a>
                </div>
              )}
              {family.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
                  <span>
                    {family.address}
                    <br />
                    {family.city}, {family.state} {family.zip}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Family Members */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold font-heading mb-4">
            Family Members
          </h2>
          <div className="space-y-3">
            {members.map((member) => (
              <Link key={member.id} href={`/directory/member/${member.id}`}>
                <Card hover>
                  <div className="flex items-center gap-4 p-4">
                    <Avatar
                      firstName={member.first_name}
                      lastName={member.last_name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-neutral-950">
                          {member.first_name} {member.last_name}
                        </p>
                        <Badge variant="muted">{member.family_role}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-neutral-700">
                        {member.show_phone && member.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {formatPhone(member.phone)}
                          </span>
                        )}
                        {member.show_email && member.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </span>
                        )}
                        {member.show_birthday && member.birthday && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(member.birthday)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
