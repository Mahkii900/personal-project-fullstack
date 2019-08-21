//----NODEMAILER STUFF-------
const secret = require('./secret_strings')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: secret.email,
        pass: secret.password
    }
})

//-------TWILIO STUFF--------
const accountSid = secret.accountSId;
const authToken = secret.authToken;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    sendEmail: async (req, res) => {
        const db = req.app.get('db')
        const {room, device, content, room_id, device_id} = req.body
        let d = new Date()
        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        let [{email}] = await db.get_email_by_room_id([room_id])
        let mailOptions = {
            from: 'notyournormalordinaryemail@gmail.com',
            to: email,
            subject: `Maintenance required for ${room}`,
            text: `Maintenance is necessary for ${device}.\nIssue:\n${content}`
        }
        
        await db.create_ticket([room_id, device_id, content, date])        
        transporter.sendMail(mailOptions, 
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
        //return res.status(200).send('NOT READY YET')
        const db = req.app.get('db')
        const {room, device, content, room_id, device_id} = req.body
        let d = new Date()
        let date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        let [{phone}] = await db.get_phone_by_room_id([room_id])

        await db.create_ticket([room_id, device_id, content, date])
        //TWILIO CODE HERE
        client.messages
        .create({
            body: `Maintenance is required in ${room}. \n Device: ${device} \n Issue: ${content}`,
            from: secret.phone,
            to: phone
        })
        .then(message => console.log(message.sid));

        res.sendStatus(200)
    }
}