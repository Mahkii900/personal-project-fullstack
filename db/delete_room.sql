UPDATE devices
SET room_id = null
WHERE room_id = $1;

DELETE FROM rooms
WHERE room_id = $1;