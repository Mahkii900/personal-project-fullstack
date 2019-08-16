SELECT date, content, name, type, history.id FROM history
JOIN devices ON history.device_id = devices.device_id
WHERE history.room_id = $1
ORDER BY history.id DESC;