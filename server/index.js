require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()
const authCtrl = require('./controllers/authController')
const rmCtrl = require('./controllers/roomController')
const dvcCtrl = require('./controllers/deviceController')
const userCtrl = require('./controllers/userController')
const msgCtrl = require('./controllers/messageController')

//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

//-----------ENDPOINTS-------------
//auth endpoints
app.post('/auth/login', authCtrl.login) //Logs user in
app.post('/auth/logout', authCtrl.logout) //Logs user out
app.get('/auth/username', authCtrl.getUsername) //Gets username

//room endpoints
app.get('/rooms/forms/:name', rmCtrl.getRoomByName) //gets Room by room name
app.get('/rooms/:room_id', rmCtrl.getRoomById) //gets Room by ID
app.get('/rooms/unassigned/devices', rmCtrl.getUnassignedDevices) //gets all unassigned devices
app.get('/rooms/devices/:room_id', rmCtrl.getRoomDevices) //gets room devices by room id
app.get('/users/rooms', rmCtrl.getUserRooms) //gets rooms by user_id (originally i wanted it to be /rooms/users, but it kept throwing an error at me)
app.get('/rooms/history/:room_id', rmCtrl.getRoomHistory) //gets history by room id
app.get('/rooms/users/:user_id', rmCtrl.getRoomByUserID) //gets room by user id
app.post('/rooms/users/assign', rmCtrl.assignRoom) //assigns a room to a user
app.put('/rooms/new', rmCtrl.createNewRoom) //creates a new room
app.get('/rooms', rmCtrl.getAllRooms) //gets all rooms & assigned user
app.delete('/rooms/:room_id', rmCtrl.deleteRoom) //deletes a room
app.post('/rooms/devices/:room_id', rmCtrl.addDevices) //adds devices to a room

//device endpoints
app.get('/devices', dvcCtrl.getAllDevices) //gets all distinct devices
app.put('/devices/new', dvcCtrl.createNewDevice) //creates new device

//user endpoints
app.get('/users', userCtrl.getAllUsers) //gets all users
app.put('/users/new', userCtrl.createNewUser) //creates a new user
app.delete('/users/:user_id', userCtrl.deleteUser)

//message endpoints
app.post('/forms/new', msgCtrl.sendEmail) //sends an email to user in charge of room
app.post('/forms/new/urgent', msgCtrl.sendText) //sends a text to user in charge of room

//DB CONNECTION AND LISTENER
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Captain's Log #${SERVER_PORT}: We are lost in space...`))
})