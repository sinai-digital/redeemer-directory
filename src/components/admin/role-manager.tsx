"use client";

import { useState } from "react";
import { updateMemberRole } from "@/lib/actions/admin";
import type { UserRole } from "@/lib/types";

interface RoleManagerProps {
  profileId: string;
  currentRole: UserRole;
  isSelf?: boolean;
}

const roles: { value: UserRole; label: string }[] = [
  { value: "member", label: "Member" },
  { value: "deacon", label: "Deacon" },
  { value: "elder", label: "Elder" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

export function RoleManager({ profileId, currentRole, isSelf }: RoleManagerProps) {
  const [role, setRole] = useState<UserRole>(currentRole);
  const [loading, setLoading] = useState(false);

  const disabled = loading || (isSelf && currentRole === "super_admin");

  async function handleChange(newRole: UserRole) {
    const previousRole = role;
    setLoading(true);
    setRole(newRole);

    const result = await updateMemberRole(profileId, newRole);
    if (result?.error) {
      setRole(previousRole);
    }

    setLoading(false);
  }

  return (
    <select
      value={role}
      onChange={(e) => handleChange(e.target.value as UserRole)}
      disabled={disabled}
      title={disabled && isSelf ? "Super admins cannot demote themselves" : undefined}
      className="text-xs rounded-md border border-neutral-200 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {roles.map((r) => (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      ))}
    </select>
  );
}
