SELECT email FROM rooms
JOIN users on rooms.user_id = users.user_id
WHERE room_id = $1;