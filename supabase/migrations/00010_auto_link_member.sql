-- Auto-link members to profiles when a new auth user is created.
-- Extends handle_new_user() to set members.profile_id by email match.

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

    UPDATE members
    SET    profile_id = NEW.id
    WHERE  LOWER(email) = LOWER(NEW.email)
      AND  profile_id IS NULL;

    RETURN NEW;
END;
$$;
