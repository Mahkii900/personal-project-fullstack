SELECT phone FROM rooms
JOIN users ON rooms.user_id = users.user_id
WHERE room_id = $1;