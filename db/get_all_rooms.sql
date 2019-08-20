SELECT name, room_id, first_name, last_name FROM rooms
LEFT JOIN users ON rooms.user_id = users.user_id
ORDER BY room_id;