"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "@/lib/actions/auth";

interface OnboardingFormProps {
  suggestedName: string;
}

export function OnboardingForm({ suggestedName }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await completeOnboarding(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    }
    // On success, the server action redirects to /directory
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <Input
          id="displayName"
          name="displayName"
          label="Your Name"
          placeholder="e.g. John Smith"
          defaultValue={suggestedName}
          required
        />
        <p className="text-xs text-neutral-500 mt-1">
          This is how other members will see you in the directory.
        </p>
      </div>

      <div>
        <Input
          id="password"
          name="password"
          type="password"
          label="Choose a Password"
          placeholder="At least 8 characters"
          required
          minLength={8}
        />
      </div>

      <div>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Enter password again"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <Button type="submit" variant="gold" loading={loading} className="w-full">
        Complete Setup
      </Button>
    </form>
  );
}
