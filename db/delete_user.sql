UPDATE rooms
SET user_id = null
WHERE user_id = $1;

DELETE FROM users
WHERE user_id = $1;