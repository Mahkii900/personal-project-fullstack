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
app.get('/rooms/devices/:room_id', rmCtrl.getRoomDevices) //gets room devices by room id
app.put('/rooms/forms', rmCtrl.makeTicket) //creates ticket in history
app.get('/users/rooms', rmCtrl.getUserRooms) //gets rooms by user_id (originally i wanted it to be /rooms/users, but it kept throwing an error at me)
app.get('/rooms/history/:room_id', rmCtrl.getRoomHistory) //gets history by room id

//device endpoints
app.get('/devices', dvcCtrl.getAllDevices) //gets all distinct devices
app.put('/devices/new', dvcCtrl.createNewDevice) //creates new device

//user endpoints
app.get('/users', userCtrl.getAllUsers)

//DB CONNECTION AND LISTENER
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Captain's Log #${SERVER_PORT}: We are lost in space...`))
})