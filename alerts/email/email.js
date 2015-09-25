var CONFIG       = require("./../../config"),
    EMAIL_CONFIG = require("./config"),
    nodemailer   = require("nodemailer")

module.exports.alert = function (subject, isError, callback) {
  var sentMailCounter = 0,
      transporter     = nodemailer.createTransport({
    service: EMAIL_CONFIG.EMAIL_PROVIDER,
    auth: {
      user: EMAIL_CONFIG.EMAIL_USER,
      pass: EMAIL_CONFIG.EMAIL_PASSWORD
    }
  })

  CONFIG.ALERT_LIST.forEach (function (emailAddress, index, array) {
    var mailOptions = {               // setup e-mail data with unicode symbols
      from: "Service Watch ✔ <Service-Watch@alert.com>", // sender address
      to: emailAddress,               // list of receivers
      subject: subject,               // Subject line
      text: subject,                  // plaintext body
      html: subject                   // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
      } else {
        console.log("Message sent: " + info.response)
      }

      if (++sentMailCounter == CONFIG.ALERT_LIST.length) {
        callback ()
      }
    })
  })
}