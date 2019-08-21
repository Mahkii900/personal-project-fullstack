UPDATE devices
SET room_id = $2
WHERE device_id = $1;