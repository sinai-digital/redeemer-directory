"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/lib/actions/auth";

export function PasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    const result = await updatePassword(formData);
    setLoading(false);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Password set successfully!" });
    }
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <Input
        id="password"
        name="password"
        type="password"
        label="New Password"
        placeholder="At least 8 characters"
        required
        minLength={8}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Enter password again"
        required
      />
      {message && (
        <p
          className={`text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
      <Button type="submit" loading={loading} size="sm">
        Set Password
      </Button>
    </form>
  );
}
