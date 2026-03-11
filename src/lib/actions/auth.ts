"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export async function loginWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  // Check allowlist
  const adminClient = createAdminClient();
  const { data: allowed } = await adminClient
    .from("auth_allowlist")
    .select("email")
    .eq("email", email.toLowerCase())
    .single();

  if (!allowed) {
    return {
      error:
        "This email is not on the approved list. Please contact a church administrator to request access.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email.toLowerCase(),
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL ? "" : ""}${typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, email };
}

export async function loginWithPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    return { error: "Invalid email or password" };
  }

  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_onboarded")
      .eq("id", data.user.id)
      .single();

    if (!profile?.is_onboarded) {
      redirect("/onboarding");
    }
  }

  redirect("/directory");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function completeOnboarding(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const displayName = formData.get("displayName") as string;

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (!displayName || !displayName.trim()) {
    return { error: "Display name is required" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Set the user's new password
  const { error: pwError } = await supabase.auth.updateUser({ password });
  if (pwError) return { error: pwError.message };

  // Update profile: set display name and mark as onboarded
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      display_name: displayName.trim(),
      is_onboarded: true,
    })
    .eq("id", user.id);

  if (profileError) return { error: profileError.message };

  // Update privacy settings if member record exists
  const memberId = formData.get("memberId") as string;
  if (memberId) {
    const adminClient = createAdminClient();
    await adminClient
      .from("members")
      .update({
        show_email: formData.get("showEmail") === "on",
        show_phone: formData.get("showPhone") === "on",
        show_birthday: formData.get("showBirthday") === "on",
        show_address: formData.get("showAddress") === "on",
      })
      .eq("id", memberId)
      .eq("profile_id", user.id);
  }

  redirect("/directory");
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
    data: { has_password: true },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
