export const REACTION_TYPES = ["praying", "amen", "heart", "thanks"] as const;
export type ReactionType = (typeof REACTION_TYPES)[number];

export const REACTION_LABELS: Record<ReactionType, { emoji: string; label: string }> = {
  praying: { emoji: "🙏", label: "Praying" },
  amen: { emoji: "✝️", label: "Amen" },
  heart: { emoji: "❤️", label: "Love" },
  thanks: { emoji: "🙌", label: "Thanks" },
};

export const FORUM_CATEGORIES_ICONS: Record<string, string> = {
  "prayer-requests": "Heart",
  announcements: "Megaphone",
  "bible-study": "BookOpen",
  fellowship: "Users",
  "serving-opportunities": "HandHeart",
  "youth-families": "Baby",
  "praise-reports": "PartyPopper",
  general: "MessageCircle",
};

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
