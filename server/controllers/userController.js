module.exports = {
    getAllUsers: async (req, res) => {
        const db = req.app.get('db')

        const users = await db.get_all_users()
        res.status(200).send(users)
    },

    createNewUser: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, phone, password, firstName, lastName, isAdmin} = req.body

        await db.create_new_user([username, email, phone, password, firstName, lastName, isAdmin])
        res.sendStatus(200)
    }
}