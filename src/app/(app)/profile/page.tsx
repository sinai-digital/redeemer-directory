import { getMyProfile } from "@/lib/actions/profile";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AvatarUpload } from "@/components/auth/avatar-upload";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/auth/profile-form";
import { PrivacyForm } from "@/components/auth/privacy-form";
import { PasswordForm } from "@/components/auth/password-form";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { formatPhone, formatDate } from "@/lib/utils/format";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";

export const metadata = {
  title: "My Profile | Redeemer Church",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const data = await getMyProfile();
  const profile = data?.profile;
  const member = data?.member;
  const family = member?.families;

  const displayName = profile?.display_name || member?.first_name || "User";
  const nameParts = displayName.split(" ");

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="My Profile"
        actions={<SignOutButton />}
      />

      <div className="space-y-6">
        {/* Profile Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AvatarUpload
                firstName={nameParts[0]}
                lastName={nameParts[1] || ""}
                avatarUrl={profile?.avatar_url}
              />
              <div>
                <h2 className="text-lg font-semibold font-heading">
                  {member ? `${member.first_name} ${member.last_name}` : displayName}
                </h2>
                <p className="text-sm text-neutral-700">{profile?.email}</p>
                <Badge variant="primary" className="mt-1">
                  {profile?.role || "member"}
                </Badge>
              </div>
            </div>

            {member && (
              <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2 text-sm text-neutral-700">
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{formatPhone(member.phone)}</span>
                  </div>
                )}
                {member.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                )}
                {family?.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {family.address}, {family.city}, {family.state} {family.zip}
                    </span>
                  </div>
                )}
                {member.birthday && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(member.birthday)}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Display Name */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold font-heading">Display Name</h3>
          </CardHeader>
          <CardContent>
            <ProfileForm currentDisplayName={profile?.display_name || ""} />
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        {member && (
          <Card>
            <CardHeader>
              <h3 className="font-semibold font-heading">Privacy Settings</h3>
              <p className="text-sm text-neutral-700 mt-1">
                Choose what information is visible to other members
              </p>
            </CardHeader>
            <CardContent>
              <PrivacyForm member={member} />
            </CardContent>
          </Card>
        )}

        {/* Set Password */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold font-heading">Set Password</h3>
            <p className="text-sm text-neutral-700 mt-1">
              Set a password to sign in without a magic link
            </p>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
