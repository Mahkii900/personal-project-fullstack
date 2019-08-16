module.exports = {
    getAllDevices: async (req, res) => {
        const db = req.app.get('db')

        const devices = await db.get_all_devices()
        res.status(200).send(devices)
    }
}