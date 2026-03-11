"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/lib/actions/auth";

export function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await updatePassword(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result?.success) {
      router.push("/directory");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <Input
        id="password"
        name="password"
        type="password"
        label="New Password"
        placeholder="At least 8 characters"
        required
        minLength={8}
        autoFocus
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Enter password again"
        required
      />

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <Button type="submit" variant="gold" loading={loading} className="w-full">
        Reset Password
      </Button>
    </form>
  );
}
