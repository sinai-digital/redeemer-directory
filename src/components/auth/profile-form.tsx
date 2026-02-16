"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/actions/profile";

interface ProfileFormProps {
  currentDisplayName: string;
}

export function ProfileForm({ currentDisplayName }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    const result = await updateProfile(formData);
    setLoading(false);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Profile updated!");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <Input
        id="displayName"
        name="displayName"
        placeholder="Enter your display name"
        defaultValue={currentDisplayName}
      />
      {message && (
        <p className="text-sm text-green-600">{message}</p>
      )}
      <Button type="submit" loading={loading} size="sm">
        Save
      </Button>
    </form>
  );
}
