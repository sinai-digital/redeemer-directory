import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingForm } from "@/components/auth/onboarding-form";

export const metadata = {
  title: "Welcome | Redeemer Church Directory",
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const isSetPassword = params["set-password"] === "1";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_onboarded, display_name")
    .eq("id", user.id)
    .single();

  // Already onboarded and NOT here to set a password — send to directory
  if (profile?.is_onboarded && !isSetPassword) redirect("/directory");

  // Try to suggest a name from the linked member record
  const { data: member } = await supabase
    .from("members")
    .select("id, first_name, last_name, show_email, show_phone, show_birthday, show_address, email, phone, birthday, address")
    .eq("profile_id", user.id)
    .single();

  const suggestedName = member
    ? `${member.first_name} ${member.last_name}`.trim()
    : profile?.display_name || "";

  const mode = profile?.is_onboarded ? "set-password" : "onboarding";

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Redeemer Church"
            width={64}
            height={58}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-heading text-primary-900">
            {mode === "set-password"
              ? "Set Your Password"
              : "Welcome to the Directory"}
          </h1>
          <p className="text-neutral-700 mt-2">
            {mode === "set-password"
              ? "Choose a password so you can sign in directly next time."
              : "Set up your account to get started."}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <OnboardingForm
              suggestedName={suggestedName}
              member={member}
              mode={mode}
            />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Redeemer Presbyterian Church (PCA) &middot; Riverview, FL
        </p>
      </div>
    </div>
  );
}
