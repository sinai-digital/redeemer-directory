-- ================================================================
-- FULL SCHEMA — Redeemer Church Directory
-- Combines migrations 00001 through 00008 into a single file
-- for fresh Supabase projects. Run in Supabase SQL Editor.
-- ================================================================

BEGIN;

-- ============================================================
-- 00001: Extensions
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 00002: Enums (using the NEW values from 00008)
-- ============================================================

CREATE TYPE user_role     AS ENUM ('member', 'deacon', 'elder', 'admin', 'super_admin');
CREATE TYPE member_status AS ENUM ('member', 'visitor', 'regular_attender', 'newcomer');
CREATE TYPE post_status   AS ENUM ('published', 'draft', 'archived', 'removed');
CREATE TYPE gender        AS ENUM ('male', 'female');
CREATE TYPE family_role   AS ENUM ('parent', 'child');


-- ============================================================
-- 00003 + 00008: Tables (includes sync columns from the start)
-- ============================================================

-- 1. auth_allowlist
CREATE TABLE auth_allowlist (
    email       text        UNIQUE NOT NULL,
    invited_by  uuid        REFERENCES auth.users,
    claimed_at  timestamptz,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. profiles
CREATE TABLE profiles (
    id           uuid        PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    email        text        NOT NULL,
    role         user_role   NOT NULL DEFAULT 'member',
    display_name text,
    avatar_url   text,
    is_onboarded boolean     NOT NULL DEFAULT false,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);

-- 3. families (with subsplash sync key)
CREATE TABLE families (
    id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    family_name            text        NOT NULL,
    display_name           text        NOT NULL,
    address                text,
    city                   text,
    state                  text,
    zip                    text,
    phone                  text,
    email                  text,
    subsplash_household_id uuid        UNIQUE,
    sort_name              text        GENERATED ALWAYS AS (lower(family_name)) STORED,
    created_at             timestamptz NOT NULL DEFAULT now(),
    updated_at             timestamptz NOT NULL DEFAULT now()
);

-- 4. members (with subsplash sync key + address + extra fields)
CREATE TABLE members (
    id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id              uuid          UNIQUE REFERENCES profiles,
    family_id               uuid          REFERENCES families ON DELETE CASCADE,  -- nullable
    family_role             family_role,                                          -- nullable
    first_name              text          NOT NULL,
    last_name               text          NOT NULL,
    email                   text,
    phone                   text,
    birthday                date,
    gender                  gender,
    member_status           member_status,                                        -- nullable
    show_email              boolean       NOT NULL DEFAULT true,
    show_phone              boolean       NOT NULL DEFAULT true,
    show_birthday           boolean       NOT NULL DEFAULT true,
    show_address            boolean       NOT NULL DEFAULT true,
    address                 text,
    city                    text,
    state                   text,
    zip                     text,
    subsplash_person_id     uuid          UNIQUE,
    marital_status          text,
    membership_status_date  date,
    baptism_date            date,
    allergy_notes           text,
    care_notes              text,
    grade_level             text,
    graduation_year         int,
    sort_name               text          GENERATED ALWAYS AS (lower(last_name || ', ' || first_name)) STORED,
    created_at              timestamptz   NOT NULL DEFAULT now(),
    updated_at              timestamptz   NOT NULL DEFAULT now()
);

-- 5. community_groups
CREATE TABLE community_groups (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name             text        NOT NULL,
    description      text,
    meeting_day      text,
    meeting_time     text,
    meeting_location text,
    leader_id        uuid        REFERENCES members,
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now()
);

-- 6. community_group_members
CREATE TABLE community_group_members (
    id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    community_group_id uuid        NOT NULL REFERENCES community_groups ON DELETE CASCADE,
    member_id          uuid        NOT NULL REFERENCES members ON DELETE CASCADE,
    created_at         timestamptz NOT NULL DEFAULT now(),
    UNIQUE (community_group_id, member_id)
);

-- 7. ministries
CREATE TABLE ministries (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text        NOT NULL,
    description text,
    category    text,
    contact_id  uuid        REFERENCES members,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);

-- 8. ministry_members
CREATE TABLE ministry_members (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    ministry_id uuid        NOT NULL REFERENCES ministries ON DELETE CASCADE,
    member_id   uuid        NOT NULL REFERENCES members ON DELETE CASCADE,
    role        text        NOT NULL DEFAULT 'member',
    created_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE (ministry_id, member_id)
);

-- 9. forum_categories
CREATE TABLE forum_categories (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text        NOT NULL,
    slug        text        UNIQUE NOT NULL,
    description text,
    icon        text,
    color       text,
    sort_order  int         NOT NULL DEFAULT 0,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- 10. forum_posts
CREATE TABLE forum_posts (
    id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id      uuid        NOT NULL REFERENCES forum_categories,
    author_id        uuid        NOT NULL REFERENCES profiles,
    title            text        NOT NULL,
    slug             text        NOT NULL,
    body             text        NOT NULL,
    status           post_status NOT NULL DEFAULT 'published',
    is_pinned        boolean     NOT NULL DEFAULT false,
    is_locked        boolean     NOT NULL DEFAULT false,
    comment_count    int         NOT NULL DEFAULT 0,
    last_activity_at timestamptz NOT NULL DEFAULT now(),
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now()
);

-- 11. forum_comments
CREATE TABLE forum_comments (
    id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id    uuid        NOT NULL REFERENCES forum_posts ON DELETE CASCADE,
    author_id  uuid        NOT NULL REFERENCES profiles,
    parent_id  uuid        REFERENCES forum_comments,
    body       text        NOT NULL,
    is_removed boolean     NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 12. forum_reactions
CREATE TABLE forum_reactions (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id    uuid        NOT NULL REFERENCES profiles,
    post_id       uuid        REFERENCES forum_posts ON DELETE CASCADE,
    comment_id    uuid        REFERENCES forum_comments ON DELETE CASCADE,
    reaction_type text        NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT reaction_target CHECK (num_nonnulls(post_id, comment_id) = 1),
    UNIQUE (profile_id, post_id, comment_id, reaction_type)
);

-- 13. sync_history
CREATE TABLE sync_history (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    performed_by    uuid        REFERENCES profiles,
    performed_at    timestamptz NOT NULL DEFAULT now(),
    csv_filename    text        NOT NULL,
    csv_row_count   int         NOT NULL,
    summary         jsonb       NOT NULL DEFAULT '{}',
    snapshot_before jsonb       NOT NULL DEFAULT '{}',
    rolled_back_at  timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now()
);


-- ============================================================
-- 00004 + 00008: Views (using LEFT JOIN + COALESCE)
-- ============================================================

CREATE VIEW directory_members_view AS
SELECT
    m.*,
    f.family_name,
    f.display_name        AS family_display_name,
    COALESCE(m.address, f.address)  AS family_address,
    COALESCE(m.city,    f.city)     AS family_city,
    COALESCE(m.state,   f.state)    AS family_state,
    COALESCE(m.zip,     f.zip)      AS family_zip,
    f.phone               AS family_phone,
    f.email               AS family_email
FROM members  m
LEFT JOIN families f ON m.family_id = f.id;


-- ============================================================
-- 00005: Functions & Triggers
-- ============================================================

-- handle_new_user(): creates profile + marks allowlist as claimed
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO profiles (id, email)
    VALUES (NEW.id, NEW.email);

    UPDATE auth_allowlist
    SET    claimed_at = now()
    WHERE  email = NEW.email;

    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- update_post_comment_count()
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_post_id uuid;
BEGIN
    IF TG_OP = 'DELETE' THEN
        target_post_id := OLD.post_id;
    ELSE
        target_post_id := NEW.post_id;
    END IF;

    UPDATE forum_posts
    SET    comment_count = (
               SELECT count(*)
               FROM   forum_comments
               WHERE  post_id    = target_post_id
                 AND  is_removed = false
           )
    WHERE  id = target_post_id;

    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_comment_change
    AFTER INSERT OR DELETE OR UPDATE OF is_removed
    ON forum_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_comment_count();

-- set_updated_at(): generic timestamp trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER update_families_updated_at
    BEFORE UPDATE ON families FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER update_community_groups_updated_at
    BEFORE UPDATE ON community_groups FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER update_ministries_updated_at
    BEFORE UPDATE ON ministries FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER update_forum_posts_updated_at
    BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER update_forum_comments_updated_at
    BEFORE UPDATE ON forum_comments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS helper functions
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    );
END;
$$;

CREATE OR REPLACE FUNCTION is_moderator()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role IN ('elder', 'admin', 'super_admin')
    );
END;
$$;


-- ============================================================
-- 00006: RLS Policies
-- ============================================================

-- auth_allowlist
ALTER TABLE auth_allowlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth_allowlist: admin select"
    ON auth_allowlist FOR SELECT TO authenticated USING (is_admin());
CREATE POLICY "auth_allowlist: admin insert"
    ON auth_allowlist FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "auth_allowlist: admin update"
    ON auth_allowlist FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "auth_allowlist: admin delete"
    ON auth_allowlist FOR DELETE TO authenticated USING (is_admin());

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: authenticated select"
    ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles: own or admin update"
    ON profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id OR is_admin())
    WITH CHECK (auth.uid() = id OR is_admin());

-- families
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

CREATE POLICY "families: authenticated select"
    ON families FOR SELECT TO authenticated USING (true);
CREATE POLICY "families: admin insert"
    ON families FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "families: admin update"
    ON families FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "families: admin delete"
    ON families FOR DELETE TO authenticated USING (is_admin());

-- members
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members: authenticated select"
    ON members FOR SELECT TO authenticated USING (true);
CREATE POLICY "members: own or admin update"
    ON members FOR UPDATE TO authenticated
    USING (profile_id = auth.uid() OR is_admin())
    WITH CHECK (profile_id = auth.uid() OR is_admin());
CREATE POLICY "members: admin insert"
    ON members FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "members: admin delete"
    ON members FOR DELETE TO authenticated USING (is_admin());

-- community_groups
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "community_groups: authenticated select"
    ON community_groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "community_groups: admin insert"
    ON community_groups FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "community_groups: admin update"
    ON community_groups FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "community_groups: admin delete"
    ON community_groups FOR DELETE TO authenticated USING (is_admin());

-- community_group_members
ALTER TABLE community_group_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "community_group_members: authenticated select"
    ON community_group_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "community_group_members: admin insert"
    ON community_group_members FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "community_group_members: admin update"
    ON community_group_members FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "community_group_members: admin delete"
    ON community_group_members FOR DELETE TO authenticated USING (is_admin());

-- ministries
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ministries: authenticated select"
    ON ministries FOR SELECT TO authenticated USING (true);
CREATE POLICY "ministries: admin insert"
    ON ministries FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "ministries: admin update"
    ON ministries FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "ministries: admin delete"
    ON ministries FOR DELETE TO authenticated USING (is_admin());

-- ministry_members
ALTER TABLE ministry_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ministry_members: authenticated select"
    ON ministry_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "ministry_members: admin insert"
    ON ministry_members FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "ministry_members: admin update"
    ON ministry_members FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "ministry_members: admin delete"
    ON ministry_members FOR DELETE TO authenticated USING (is_admin());

-- forum_categories
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_categories: authenticated select"
    ON forum_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "forum_categories: admin insert"
    ON forum_categories FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "forum_categories: admin update"
    ON forum_categories FOR UPDATE TO authenticated
    USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "forum_categories: admin delete"
    ON forum_categories FOR DELETE TO authenticated USING (is_admin());

-- forum_posts
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_posts: visible select"
    ON forum_posts FOR SELECT TO authenticated
    USING (status = 'published' OR author_id = auth.uid() OR is_moderator());
CREATE POLICY "forum_posts: author insert"
    ON forum_posts FOR INSERT TO authenticated
    WITH CHECK (author_id = auth.uid());
CREATE POLICY "forum_posts: author or moderator update"
    ON forum_posts FOR UPDATE TO authenticated
    USING (author_id = auth.uid() OR is_moderator())
    WITH CHECK (author_id = auth.uid() OR is_moderator());
CREATE POLICY "forum_posts: admin delete"
    ON forum_posts FOR DELETE TO authenticated USING (is_admin());

-- forum_comments
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_comments: visible select"
    ON forum_comments FOR SELECT TO authenticated
    USING (is_removed = false OR author_id = auth.uid() OR is_moderator());
CREATE POLICY "forum_comments: author insert"
    ON forum_comments FOR INSERT TO authenticated
    WITH CHECK (author_id = auth.uid());
CREATE POLICY "forum_comments: author or moderator update"
    ON forum_comments FOR UPDATE TO authenticated
    USING (author_id = auth.uid() OR is_moderator())
    WITH CHECK (author_id = auth.uid() OR is_moderator());

-- forum_reactions
ALTER TABLE forum_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_reactions: authenticated select"
    ON forum_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "forum_reactions: own insert"
    ON forum_reactions FOR INSERT TO authenticated
    WITH CHECK (profile_id = auth.uid());
CREATE POLICY "forum_reactions: own delete"
    ON forum_reactions FOR DELETE TO authenticated
    USING (profile_id = auth.uid());

-- sync_history
ALTER TABLE sync_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can do everything on sync_history"
    ON sync_history FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'super_admin')
        )
    );


-- ============================================================
-- 00007: Avatar Storage
-- ============================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anyone authenticated can view avatars" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'avatars');


-- ============================================================
-- Indexes
-- ============================================================

-- Trigram indexes for fuzzy search
CREATE INDEX idx_members_first_name_trgm     ON members  USING gin (first_name  gin_trgm_ops);
CREATE INDEX idx_members_last_name_trgm      ON members  USING gin (last_name   gin_trgm_ops);
CREATE INDEX idx_families_display_name_trgm  ON families USING gin (display_name gin_trgm_ops);
CREATE INDEX idx_forum_posts_title_trgm      ON forum_posts USING gin (title      gin_trgm_ops);

-- Sort indexes
CREATE INDEX idx_families_sort_name ON families (sort_name);
CREATE INDEX idx_members_sort_name  ON members  (sort_name);

-- Foreign-key indexes
CREATE INDEX idx_members_family_id                  ON members                (family_id);
CREATE INDEX idx_members_profile_id                 ON members                (profile_id);
CREATE INDEX idx_community_group_members_group_id   ON community_group_members (community_group_id);
CREATE INDEX idx_community_group_members_member_id  ON community_group_members (member_id);
CREATE INDEX idx_community_groups_leader_id         ON community_groups       (leader_id);
CREATE INDEX idx_ministry_members_ministry_id       ON ministry_members       (ministry_id);
CREATE INDEX idx_ministry_members_member_id         ON ministry_members       (member_id);
CREATE INDEX idx_ministries_contact_id              ON ministries             (contact_id);
CREATE INDEX idx_forum_posts_author_id              ON forum_posts            (author_id);
CREATE INDEX idx_forum_comments_author_id           ON forum_comments         (author_id);
CREATE INDEX idx_forum_comments_parent_id           ON forum_comments         (parent_id);
CREATE INDEX idx_forum_reactions_profile_id         ON forum_reactions        (profile_id);
CREATE INDEX idx_forum_reactions_post_id            ON forum_reactions        (post_id);
CREATE INDEX idx_forum_reactions_comment_id         ON forum_reactions        (comment_id);

-- Forum composite indexes
CREATE INDEX idx_forum_posts_category_status_activity
    ON forum_posts (category_id, status, last_activity_at DESC);
CREATE INDEX idx_forum_comments_post_created
    ON forum_comments (post_id, created_at);

-- Allowlist + Subsplash sync indexes
CREATE INDEX idx_auth_allowlist_email                ON auth_allowlist (email);
CREATE INDEX idx_members_subsplash_person_id         ON members  (subsplash_person_id)    WHERE subsplash_person_id IS NOT NULL;
CREATE INDEX idx_families_subsplash_household_id     ON families (subsplash_household_id) WHERE subsplash_household_id IS NOT NULL;


-- ============================================================
-- Bootstrap: Add Matt Pike to the allowlist
-- ============================================================

INSERT INTO auth_allowlist (email) VALUES ('mattp91@gmail.com');

COMMIT;
