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
        console.log(d.getMonth())
        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

        await db.create_ticket([room_id, device_id, content, date])
        res.sendStatus(200)
    }
}