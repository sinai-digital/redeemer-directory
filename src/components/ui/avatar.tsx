import { cn } from "@/lib/utils/cn";
import { getInitials } from "@/lib/utils/format";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

const colors = [
  "bg-primary-100 text-primary-800",
  "bg-accent-300 text-neutral-950",
  "bg-primary-200 text-primary-900",
  "bg-neutral-200 text-neutral-900",
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function Avatar({ firstName, lastName, avatarUrl, size = "md", className }: AvatarProps) {
  const initials = getInitials(firstName, lastName);
  const colorIndex = hashName(firstName + lastName) % colors.length;

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        className={cn(
          "rounded-full object-cover",
          sizeStyles[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0",
        sizeStyles[size],
        colors[colorIndex],
        className
      )}
      aria-label={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
