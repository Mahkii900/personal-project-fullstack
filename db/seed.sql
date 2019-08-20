DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS history;

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(40),
first_name VARCHAR(30),
last_name VARCHAR(30),
email VARCHAR(60),
password TEXT,
is_admin BOOLEAN,
phone VARCHAR(20)
);

CREATE TABLE rooms (
room_id SERIAL PRIMARY KEY,
name VARCHAR(50),
user_id INT REFERENCES users(user_id)
);

CREATE TABLE devices (
device_id SERIAL PRIMARY KEY,
name VARCHAR(30),
type VARCHAR(50),
room_id INT REFERENCES rooms(room_id)
);

CREATE TABLE history (
id SERIAL PRIMARY KEY,
date VARCHAR(20),
content TEXT,
room_id INT REFERENCES rooms(room_id),
device_id INT REFERENCES devices(device_id)
);

INSERT INTO users (username, email, password, is_admin, phone)
VALUES ('bigBubba', 'big@bub.com', 'bbb', false, '555-555-5555'),
('razzMahDazz', 'razzledazzle@mah.net', 'rzdz', false, '123-456-7890'),
('Dio', 'uthoughtthiswasanemail@me.dio', 'kono', true, '404-040-4040');

INSERT INTO rooms (name, user_id)
VALUES ('conf-rm-w8', 2),
('conf-rm-h9', 1),
('conf-rm-i2', 3);

INSERT INTO devices (name, type, room_id)
VALUES ('projector', 'EPSON I-1800', 2),
('tv', 'SONY BRAVIA T-500', 1),
('iron man', 'Mk. LII', 3);

INSERT INTO history (date, content, room_id, device_id)
VALUES ('14-08-2019', 'KONO DIO DA! WRYYYYYY!', 3, 3),
('21-09-1996', 'Wont display anything', 1, 2),
('08-08-2008', 'Does not exist', 2, 1);