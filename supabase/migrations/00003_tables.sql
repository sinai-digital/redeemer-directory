-- All tables for the church directory and community forum.

-- 1. auth_allowlist
-- Controls who is allowed to sign up. Entries are created by admins and
-- claimed when the invited user completes registration.
CREATE TABLE auth_allowlist (
    email       text        UNIQUE NOT NULL,
    invited_by  uuid        REFERENCES auth.users,
    claimed_at  timestamptz,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. profiles
-- One-to-one with auth.users. Stores app-level user metadata.
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

-- 3. families
-- A household unit in the directory.
CREATE TABLE families (
    id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    family_name  text        NOT NULL,
    display_name text        NOT NULL,
    address      text,
    city         text,
    state        text,
    zip          text,
    phone        text,
    email        text,
    sort_name    text        GENERATED ALWAYS AS (lower(family_name)) STORED,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);

-- 4. members
-- Individual people belonging to a family.
CREATE TABLE members (
    id            uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id    uuid          UNIQUE REFERENCES profiles,
    family_id     uuid          NOT NULL REFERENCES families ON DELETE CASCADE,
    family_role   family_role   NOT NULL DEFAULT 'other',
    first_name    text          NOT NULL,
    last_name     text          NOT NULL,
    email         text,
    phone         text,
    birthday      date,
    gender        gender,
    member_status member_status NOT NULL DEFAULT 'active',
    show_email    boolean       NOT NULL DEFAULT true,
    show_phone    boolean       NOT NULL DEFAULT true,
    show_birthday boolean       NOT NULL DEFAULT true,
    show_address  boolean       NOT NULL DEFAULT true,
    sort_name     text          GENERATED ALWAYS AS (lower(last_name || ', ' || first_name)) STORED,
    created_at    timestamptz   NOT NULL DEFAULT now(),
    updated_at    timestamptz   NOT NULL DEFAULT now()
);

-- 5. community_groups
-- Small groups that meet regularly.
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
-- Join table linking members to community groups.
CREATE TABLE community_group_members (
    id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    community_group_id uuid        NOT NULL REFERENCES community_groups ON DELETE CASCADE,
    member_id          uuid        NOT NULL REFERENCES members ON DELETE CASCADE,
    created_at         timestamptz NOT NULL DEFAULT now(),
    UNIQUE (community_group_id, member_id)
);

-- 7. ministries
-- Church ministries and service areas.
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
-- Join table linking members to ministries.
CREATE TABLE ministry_members (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    ministry_id uuid        NOT NULL REFERENCES ministries ON DELETE CASCADE,
    member_id   uuid        NOT NULL REFERENCES members ON DELETE CASCADE,
    role        text        NOT NULL DEFAULT 'member',
    created_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE (ministry_id, member_id)
);

-- 9. forum_categories
-- Top-level categories for the community forum.
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
-- Discussion threads within forum categories.
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
-- Comments on forum posts, supporting nested replies via parent_id.
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
-- Reactions (likes, etc.) on posts or comments. Exactly one target must be set.
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


-- ============================================================
-- Indexes
-- ============================================================

-- Trigram indexes for fuzzy search
CREATE INDEX idx_members_first_name_trgm  ON members  USING gin (first_name  gin_trgm_ops);
CREATE INDEX idx_members_last_name_trgm   ON members  USING gin (last_name   gin_trgm_ops);
CREATE INDEX idx_families_display_name_trgm ON families USING gin (display_name gin_trgm_ops);
CREATE INDEX idx_forum_posts_title_trgm   ON forum_posts USING gin (title      gin_trgm_ops);

-- Sort indexes
CREATE INDEX idx_families_sort_name ON families (sort_name);
CREATE INDEX idx_members_sort_name  ON members  (sort_name);

-- Foreign-key indexes on join / child tables
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

-- Forum listing: category + status + latest activity
CREATE INDEX idx_forum_posts_category_status_activity
    ON forum_posts (category_id, status, last_activity_at DESC);

-- Comment listing by post
CREATE INDEX idx_forum_comments_post_created
    ON forum_comments (post_id, created_at);

-- Allowlist lookup
CREATE INDEX idx_auth_allowlist_email ON auth_allowlist (email);
