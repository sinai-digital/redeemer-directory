-- Functions and triggers.

-- ============================================================
-- 1. handle_new_user()
--    Fired after a row is inserted into auth.users.
--    Creates the corresponding profile and marks the allowlist
--    entry as claimed.
-- ============================================================
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


-- ============================================================
-- 2. update_post_comment_count()
--    Keeps forum_posts.comment_count in sync whenever a comment
--    is inserted, deleted, or soft-removed / restored.
-- ============================================================
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_post_id uuid;
BEGIN
    -- Determine which post was affected.
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


-- ============================================================
-- 3. set_updated_at()
--    Generic trigger to stamp updated_at on every UPDATE.
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;

-- Apply the updated_at trigger to every table that carries the column.
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER update_families_updated_at
    BEFORE UPDATE ON families
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER update_community_groups_updated_at
    BEFORE UPDATE ON community_groups
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER update_ministries_updated_at
    BEFORE UPDATE ON ministries
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER update_forum_posts_updated_at
    BEFORE UPDATE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER update_forum_comments_updated_at
    BEFORE UPDATE ON forum_comments
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ============================================================
-- 4. Helper functions for RLS policies
-- ============================================================

-- Returns true when the current user has an admin or super_admin role.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM   profiles
        WHERE  id   = auth.uid()
          AND  role IN ('admin', 'super_admin')
    );
END;
$$;

-- Returns true when the current user is at least an elder.
CREATE OR REPLACE FUNCTION is_moderator()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM   profiles
        WHERE  id   = auth.uid()
          AND  role IN ('elder', 'admin', 'super_admin')
    );
END;
$$;
