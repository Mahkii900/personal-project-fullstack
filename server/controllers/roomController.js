module.exports = {
    getRoomByName: async (req, res) => {
        const db = req.app.get('db')
        const {name} = req.params
        
        const [room] = await db.get_room_by_name([name])

        if (!room) {
            return res.sendStatus(404)
        }
        res.status(200).send(room)
    },

    getRoomById: async (req, res) => {
        const db = req.app.get('db')
        const {room_id} = req.params

        const [room] = await db.get_room_by_id([room_id])

        res.status(200).send(room)
    },

    getRoomDevices: async (req, res) => {
        const db = req.app.get('db')
        const {room_id} = req.params

        const devices = await db.get_room_devices([room_id])
        if (devices.length === 0) {
            return res.status(200).send([{device_id: 0, name: '', type: 'NO DEVICES FOUND FOR THIS ROOM'}])
        }

        res.status(200).send(devices)
    },

    makeTicket: async (req, res) => {
        const db = req.app.get('db')
        const {room_id, device_id, content} = req.body
        let d = new Date()
        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

        await db.create_ticket([room_id, device_id, content, date])
        res.sendStatus(200)
    },

    getUserRooms: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session

        let rooms = await db.get_user_rooms([user_id])

        if (rooms.length === 0) {
            res.status(200).send('None available')
        }
        res.status(200).send(rooms)
    },

    getRoomHistory: async (req, res) => {
        const db = req.app.get('db')
        const {room_id} = req.params

        let history = await db.get_history([room_id])

        if (history.length === 0) {
            res.status(200).send([{content: 'No history available...', date: '', name: 'N/A', type: 'N/A', id: 1}])
        }

        res.status(200).send(history)
    },

    getRoomByUserID: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params

        let rooms = await db.get_rooms_by_user_id([user_id])

        if(rooms.lenght === 0) {
            res.sendStatus(404)
        }

        res.status(200).send(rooms)
    },

    assignRoom: async (req, res) => {
        const db = req.app.get('db')
        const {room_id} = req.body
        const {user_id} = req.session

        await db.assign_room([user_id, room_id])

        res.sendStatus(200)
    },

    createNewRoom: async (req, res) => {
        const db = req.app.get('db')
        const {name} = req.body

        await db.create_room([name])

        res.sendStatus(201)
    },

    getAllRooms: async (req, res) => {
        const db = req.app.get('db')
        
        let rooms = await db.get_all_rooms()

        if (rooms.length === 0) {
            res.sendStatus(500)
        }

        res.status(200).send(rooms)
    }
}