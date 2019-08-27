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
const midWare = require('./middleware/middleware')

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
app.use( express.static( `${__dirname}/../build` ) )

//-----------ENDPOINTS-------------
//auth endpoints
app.post('/auth/login', authCtrl.login) //Logs user in
app.post('/auth/logout', authCtrl.logout) //Logs user out
app.get('/auth/username', midWare.authenticate, authCtrl.getUsername) //Gets username
app.get('/auth/admin', midWare.authenticate, authCtrl.isAdmin) //gets whether or not user has admin access

//room endpoints
app.get('/rooms/forms/:name', rmCtrl.getRoomByName) //gets Room by room name
app.get('/rooms/:room_id', rmCtrl.getRoomById) //gets Room by ID
app.get('/rooms/unassigned/devices', midWare.authenticate, rmCtrl.getUnassignedDevices) //gets all unassigned devices
app.get('/rooms/devices/:room_id',rmCtrl.getRoomDevices) //gets room devices by room id
app.get('/users/rooms', midWare.authenticate, rmCtrl.getUserRooms) //gets rooms by user_id (originally i wanted it to be /rooms/users, but it kept throwing an error at me)
app.get('/rooms/history/:room_id', midWare.authenticate, rmCtrl.getRoomHistory) //gets history by room id
app.get('/rooms/users/:user_id', midWare.authenticate, rmCtrl.getRoomByUserID) //gets room by user id
app.post('/rooms/users/assign', midWare.authenticate, midWare.adminAccess, rmCtrl.assignRoom) //assigns a room to a user
app.put('/rooms/new', midWare.authenticate, midWare.adminAccess, rmCtrl.createNewRoom) //creates a new room
app.get('/rooms', midWare.authenticate, rmCtrl.getAllRooms) //gets all rooms & assigned user
app.delete('/rooms/:room_id', midWare.authenticate, midWare.adminAccess, rmCtrl.deleteRoom) //deletes a room
app.post('/rooms/devices/:room_id', rmCtrl.addDevices) //adds devices to a room

//device endpoints
app.get('/devices', midWare.authenticate, dvcCtrl.getAllDevices) //gets all distinct devices
app.put('/devices/new', dvcCtrl.createNewDevice) //creates new device
app.post('/devices/rooms/:device_id', dvcCtrl.removeDeviceFromRoom) //removes device from room
app.delete('/devices/:device_id', dvcCtrl.deleteDevice) //deletes device

//user endpoints
app.get('/users', midWare.authenticate, userCtrl.getAllUsers) //gets all users
app.put('/users/new', midWare.authenticate, midWare.adminAccess, userCtrl.createNewUser) //creates a new user
app.delete('/users/:user_id', midWare.authenticate, midWare.adminAccess, userCtrl.deleteUser)

//message endpoints
app.post('/forms/new', msgCtrl.sendEmail) //sends an email to user in charge of room
app.post('/forms/new/urgent', msgCtrl.sendText) //sends a text to user in charge of room

//DB CONNECTION AND LISTENER
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Captain's Log #${SERVER_PORT}: We are lost in space...`))
})