module.exports = {
    getAllDevices: async (req, res) => {
        const db = req.app.get('db')

        const devices = await db.get_all_devices()
        res.status(200).send(devices)
    },

    createNewDevice: async (req, res) => {
        const db = req.app.get('db')
        const {name, type} = req.body
        await db.create_new_device([name, type])
        res.sendStatus(200)
    },

    removeDeviceFromRoom: async (req, res) => {
        const db = req.app.get('db')
        const {device_id} = req.params

        await db.remove_device([device_id])
        res.sendStatus(200)
    },

    deleteDevice: async (req, res) => {
        const db = req.app.get('db')
        const {device_id} = req.params

        await db.delete_device([device_id])
        res.sendStatus(200)
    }
}