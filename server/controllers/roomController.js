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
            return res.sendStatus(404)
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
            res.sendStatus(404)
        }
        res.status(200).send(rooms)
    },

    getRoomHistory: async (req, res) => {
        const db = req.app.get('db')
        const {room_id} = req.params

        let history = await db.get_history([room_id])

        if (history.length === 0) {
            res.status(200).send([{content: 'No history available...', date: '00-0-0000', name: 'N/A', type: 'N/A', id: 1}])
        }

        res.status(200).send(history)
    }
}