const bcyrpt = require('bcryptjs')

module.exports = {
    getAllUsers: async (req, res) => {
        const db = req.app.get('db')

        const users = await db.get_all_users()
        res.status(200).send(users)
    },

    createNewUser: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, phone, password, firstName, lastName, isAdmin} = req.body

        const salt = bcyrpt.genSaltSync(10)
        const hash = bcyrpt.hashSync(password, salt)
        await db.create_new_user([username, email, phone, hash, firstName, lastName, isAdmin])
        res.sendStatus(200)
    },

    deleteUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params

        await db.delete_user([user_id])
        res.sendStatus(200)
    }
}