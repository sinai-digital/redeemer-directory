export type UserRole = "member" | "deacon" | "elder" | "admin" | "super_admin";
export type MemberStatus = "member" | "visitor" | "regular_attender" | "newcomer";
export type PostStatus = "published" | "draft" | "archived" | "removed";
export type Gender = "male" | "female";
export type FamilyRole = "parent" | "child";
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
  subsplash_household_id: string | null;
  sort_name: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  profile_id: string | null;
  family_id: string | null;
  family_role: FamilyRole | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  gender: Gender | null;
  member_status: MemberStatus | null;
  show_email: boolean;
  show_phone: boolean;
  show_birthday: boolean;
  show_address: boolean;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  subsplash_person_id: string | null;
  marital_status: string | null;
  membership_status_date: string | null;
  baptism_date: string | null;
  allergy_notes: string | null;
  care_notes: string | null;
  grade_level: string | null;
  graduation_year: number | null;
  sort_name: string;
  created_at: string;
  updated_at: string;
}

export interface DirectoryMember extends Member {
  family_name: string | null;
  family_display_name: string | null;
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

// ============================================================
// Subsplash Sync Types
// ============================================================

export interface SubsplashPerson {
  person_id: string;
  external_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  membership_status: string;
  membership_status_date: string;
  marital_status: string;
  grade_level: string;
  graduation_year: string;
  allergy_notes: string;
  care_notes: string;
  baptism_date: string;
  street: string;
  street_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  household_id: string;
  household_role: string;
  household_street: string;
  household_street_2: string;
  household_city: string;
  household_state: string;
  household_postal_code: string;
  household_country: string;
}

export interface SyncPreviewMemberChange {
  person_id: string;
  first_name: string;
  last_name: string;
  type: "added" | "updated" | "removed" | "unchanged";
  has_profile: boolean;
  changes?: string[];
}

export interface SyncPreviewFamilyChange {
  household_id: string;
  family_name: string;
  type: "added" | "updated" | "removed" | "unchanged";
}

export interface SyncPreview {
  members: {
    added: SyncPreviewMemberChange[];
    updated: SyncPreviewMemberChange[];
    removed: SyncPreviewMemberChange[];
    unchanged: SyncPreviewMemberChange[];
  };
  families: {
    added: SyncPreviewFamilyChange[];
    updated: SyncPreviewFamilyChange[];
    removed: SyncPreviewFamilyChange[];
    unchanged: SyncPreviewFamilyChange[];
  };
}

export interface SyncHistoryEntry {
  id: string;
  performed_by: string | null;
  performed_at: string;
  csv_filename: string;
  csv_row_count: number;
  summary: {
    members_added: number;
    members_updated: number;
    members_removed: number;
    families_added: number;
    families_updated: number;
    families_removed: number;
  };
  rolled_back_at: string | null;
  created_at: string;
  performer?: Profile;
}
