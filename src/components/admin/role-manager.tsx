"use client";

import { useState } from "react";
import { updateMemberRole } from "@/lib/actions/admin";
import type { UserRole } from "@/lib/types";

interface RoleManagerProps {
  profileId: string;
  currentRole: UserRole;
}

const roles: { value: UserRole; label: string }[] = [
  { value: "member", label: "Member" },
  { value: "deacon", label: "Deacon" },
  { value: "elder", label: "Elder" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

export function RoleManager({ profileId, currentRole }: RoleManagerProps) {
  const [role, setRole] = useState<UserRole>(currentRole);
  const [loading, setLoading] = useState(false);

  async function handleChange(newRole: UserRole) {
    setLoading(true);
    setRole(newRole);
    await updateMemberRole(profileId, newRole);
    setLoading(false);
  }

  return (
    <select
      value={role}
      onChange={(e) => handleChange(e.target.value as UserRole)}
      disabled={loading}
      className="text-xs rounded-md border border-neutral-200 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
    >
      {roles.map((r) => (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      ))}
    </select>
  );
}
