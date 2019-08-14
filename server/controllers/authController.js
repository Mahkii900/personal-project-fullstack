module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const [user] = await db.get_user([username])

        if (!user) {
            return res.sendStatus(404)
        }

        if (user.password !== password) {
            return res.sendStatus(403)
        }

        req.session.user_id = user.user_id
        res.sendStatus(200)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}