import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Reset Password | Redeemer Church Directory",
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_onboarded")
    .eq("id", user.id)
    .single();

  // Safety guard: un-onboarded users should go through full onboarding
  if (!profile?.is_onboarded) redirect("/onboarding");

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
            Reset Your Password
          </h1>
          <p className="text-neutral-700 mt-2">
            Choose a new password for your account.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <ResetPasswordForm />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Redeemer Presbyterian Church (PCA) &middot; Riverview, FL
        </p>
      </div>
    </div>
  );
}
