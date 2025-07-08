const mailer = require("nodemailer")

const sendingMail = async(to,subject,text)=>{

    const  transport = mailer.createTransport({

        service:"gmail",
        auth:{
            user:"lamya.patel1@gmail.com",
            pass:"pceh nojo stfd ucjx"
        }

    })
    const mailOptions  ={
        from:"lamya.patel1@gmail.com",
        to:to,
        subject:subject,
        //text:text,
        html:text
    }

    const mailInfo = await transport.sendMail(mailOptions)
    console.log(mailInfo.messageId)

}

// sendingMail("lamya.patel23@gmail.com","welcome","hello people")

module.exports={
    sendingMail
}