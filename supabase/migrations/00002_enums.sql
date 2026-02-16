-- Custom enum types for the church directory and community forum.

CREATE TYPE user_role AS ENUM ('member', 'deacon', 'elder', 'admin', 'super_admin');

CREATE TYPE member_status AS ENUM ('active', 'inactive', 'visitor', 'transferred');

CREATE TYPE post_status AS ENUM ('published', 'draft', 'archived', 'removed');

CREATE TYPE gender AS ENUM ('male', 'female');

CREATE TYPE family_role AS ENUM ('head', 'spouse', 'child', 'other');
