import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingForm } from "@/components/auth/onboarding-form";

export const metadata = {
  title: "Welcome | Redeemer Church Directory",
};

export default async function OnboardingPage() {
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

  // Already onboarded — send them to the directory
  if (profile?.is_onboarded) redirect("/directory");

  // Try to suggest a name from the linked member record
  const { data: member } = await supabase
    .from("members")
    .select("first_name, last_name")
    .eq("profile_id", user.id)
    .single();

  const suggestedName = member
    ? `${member.first_name} ${member.last_name}`.trim()
    : profile?.display_name || "";

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
            Welcome to the Directory
          </h1>
          <p className="text-neutral-700 mt-2">
            Set up your account to get started.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <OnboardingForm suggestedName={suggestedName} />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Redeemer Presbyterian Church (PCA) &middot; Riverview, FL
        </p>
      </div>
    </div>
  );
}
