const nodemailer = require('nodemailer')
//require Twilio here


//------COMPELETE THE FOLLOWING BLANK FIELDS------------
/*
const transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        pass: ''
    }
})

let mailOptions = {
    from: '',
    to: '',
    subject: '',
    text: ''
}
*/

module.exports = {
    sendEmail: async (req, res) => {
        return res.status(200).send('NOT READY YET')
        const db = req.app.get('db')
        const {room, device, content, room_id, device_id} = req.body
        let d = new Date()
        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

        await db.create_ticket([room_id, device_id, content, date])
        let newMailOptions = {...mailOptions, subject: `Maintenance required for ${room}`,
            text: `Device: device \n ${content}`
        }
        
        transporter.sendMail(newMailOptions, 
            function(error, info) {
                if (error) {
                    console.log(error)
                    res.sendStatus(500)
                } else {
                    res.status(200).send('Email sent: ' + info.response)
                }
            }
        )
    },

    sendText: async (req, res) => {
        return res.status(200).send('NOT READY YET')
        const db = req.app.get('db')
        const {room, device, content, room_id, device_id} = req.body
        let d = new Date()
        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

        await db.create_ticket([room_id, device_id, content, date])

        //TWILIO CODE HERE
    }
}