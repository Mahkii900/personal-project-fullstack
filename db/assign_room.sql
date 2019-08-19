UPDATE rooms
SET user_id = $1
WHERE room_id = $2;