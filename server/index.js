require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()
const authCtrl = require('./controllers/authController')
const rmCtrl = require('./controllers/roomController')

//TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

//ENDPOINTS
app.post('/auth/login', authCtrl.login) //Logs user in
app.post('/auth/logout', authCtrl.logout) //Logs user out
app.get('/rooms/forms/:name', rmCtrl.getRoomByName) //gets Room by room name
app.get('/rooms/:room_id', rmCtrl.getRoomById) //gets Room by ID
app.get('/rooms/devices/:room_id', rmCtrl.getRoomDevices) //gets room devices by room id
app.get('/auth/username', authCtrl.getUsername)

//DB CONNECTION AND LISTENER
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Captain's Log #${SERVER_PORT}: We are lost in space...`))
})