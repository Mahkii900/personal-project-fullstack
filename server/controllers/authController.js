const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const [user] = await db.get_user([username])

        if (!user) {
            return res.sendStatus(404)
        }

        const result = bcrypt.compareSync(password, user.password)
        if (!result) {
            return res.sendStatus(403)
        }

        delete user.password
        req.session.user_id = user.user_id
        req.session.isAdmin = user.is_admin
        res.sendStatus(200)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUsername: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session

        const [username] = await db.get_username_by_id([user_id])
        res.status(200).send(username)
    },

    isAdmin: (req, res) => {
        res.status(200).send(req.session.isAdmin)
    }
}