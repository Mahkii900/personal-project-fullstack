UPDATE devices
SET room_id = NULL
WHERE device_id = $1;