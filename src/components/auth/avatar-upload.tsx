"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { uploadAvatar } from "@/lib/actions/profile";
import { Camera, Loader2 } from "lucide-react";

interface AvatarUploadProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
}

export function AvatarUpload({ firstName, lastName, avatarUrl }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > 2 * 1024 * 1024) {
      setError("File must be under 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    startTransition(async () => {
      const result = await uploadAvatar(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });

    // Reset input so the same file can be re-selected
    e.target.value = "";
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="relative group cursor-pointer"
        disabled={isPending}
      >
        <Avatar
          firstName={firstName}
          lastName={lastName}
          avatarUrl={avatarUrl}
          size="xl"
        />
        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isPending ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-white" />
          )}
        </div>
        {isPending && (
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}
