"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addToAllowlist } from "@/lib/actions/admin";
import { Plus } from "lucide-react";

export function AddToAllowlistForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    const result = await addToAllowlist(formData);
    setLoading(false);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Email added to allowlist!" });
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          name="email"
          type="email"
          placeholder="Enter email address"
          required
        />
      </div>
      <Button type="submit" loading={loading} size="md">
        <Plus className="h-4 w-4" />
        Add
      </Button>
      {message && (
        <p
          className={`text-sm self-center ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
