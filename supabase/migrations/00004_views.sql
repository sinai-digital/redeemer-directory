-- Views for common queries.

CREATE VIEW directory_members_view AS
SELECT
    m.*,
    f.family_name,
    f.display_name  AS family_display_name,
    f.address       AS family_address,
    f.city          AS family_city,
    f.state         AS family_state,
    f.zip           AS family_zip,
    f.phone         AS family_phone,
    f.email         AS family_email
FROM members  m
JOIN families f ON m.family_id = f.id;
