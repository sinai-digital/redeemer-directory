export type UserRole = "member" | "deacon" | "elder" | "admin" | "super_admin";
export type MemberStatus = "active" | "inactive" | "visitor" | "transferred";
export type PostStatus = "published" | "draft" | "archived" | "removed";
export type Gender = "male" | "female";
export type FamilyRole = "head" | "spouse" | "child" | "other";
export type ReactionType = "praying" | "amen" | "heart" | "thanks";

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  display_name: string | null;
  avatar_url: string | null;
  is_onboarded: boolean;
  created_at: string;
  updated_at: string;
}

export interface Family {
  id: string;
  family_name: string;
  display_name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
  sort_name: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  profile_id: string | null;
  family_id: string;
  family_role: FamilyRole;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  gender: Gender | null;
  member_status: MemberStatus;
  show_email: boolean;
  show_phone: boolean;
  show_birthday: boolean;
  show_address: boolean;
  sort_name: string;
  created_at: string;
  updated_at: string;
}

export interface DirectoryMember extends Member {
  family_name: string;
  family_display_name: string;
  family_address: string | null;
  family_city: string | null;
  family_state: string | null;
  family_zip: string | null;
  family_phone: string | null;
  family_email: string | null;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string | null;
  meeting_day: string | null;
  meeting_time: string | null;
  meeting_location: string | null;
  leader_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  contact_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number;
  created_at: string;
}

export interface ForumPost {
  id: string;
  category_id: string;
  author_id: string;
  title: string;
  slug: string;
  body: string;
  status: PostStatus;
  is_pinned: boolean;
  is_locked: boolean;
  comment_count: number;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
}

export interface ForumComment {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  body: string;
  is_removed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ForumReaction {
  id: string;
  profile_id: string;
  post_id: string | null;
  comment_id: string | null;
  reaction_type: ReactionType;
  created_at: string;
}

export interface ForumPostWithAuthor extends ForumPost {
  author: Profile;
  category?: ForumCategory;
}

export interface ForumCommentWithAuthor extends ForumComment {
  author: Profile;
  replies?: ForumCommentWithAuthor[];
}
