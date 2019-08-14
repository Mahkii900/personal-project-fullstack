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
    }
}