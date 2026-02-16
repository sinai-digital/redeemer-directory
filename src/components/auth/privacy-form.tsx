"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateMemberPrivacy } from "@/lib/actions/profile";

interface PrivacyFormProps {
  member: {
    id: string;
    show_email: boolean;
    show_phone: boolean;
    show_birthday: boolean;
    show_address: boolean;
  };
}

export function PrivacyForm({ member }: PrivacyFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    const result = await updateMemberPrivacy(formData);
    setLoading(false);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Privacy settings updated!");
    }
  }

  const fields = [
    { name: "showEmail", label: "Show email address", defaultChecked: member.show_email },
    { name: "showPhone", label: "Show phone number", defaultChecked: member.show_phone },
    { name: "showBirthday", label: "Show birthday", defaultChecked: member.show_birthday },
    { name: "showAddress", label: "Show home address", defaultChecked: member.show_address },
  ];

  return (
    <form action={handleSubmit} className="space-y-3">
      <input type="hidden" name="memberId" value={member.id} />
      <div className="space-y-2">
        {fields.map((field) => (
          <label
            key={field.name}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              name={field.name}
              defaultChecked={field.defaultChecked}
              className="rounded border-neutral-300 text-primary-800 focus:ring-primary-300"
            />
            <span className="text-sm text-neutral-900">{field.label}</span>
          </label>
        ))}
      </div>
      {message && (
        <p className="text-sm text-green-600">{message}</p>
      )}
      <Button type="submit" loading={loading} size="sm">
        Save Privacy Settings
      </Button>
    </form>
  );
}
