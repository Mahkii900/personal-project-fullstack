module.exports = {
    authenticate: async (req, res, next) => {
        if(!req.session.user_id) {
            res.status(401).send({message: 'User is not logged in.'})
        }
        const db = req.app.get('db')
        let [username] = await db.get_username_by_id([req.session.user_id])
        if (!username) {
            res.status(401).send({message: 'User is not logged in.'})
        }
        next()
    },

    adminAccess: (req, res, next) => {
        if (req.session.isAdmin) {
            next()
        } else {
        res.sendStatus(403)
        }
    }
}