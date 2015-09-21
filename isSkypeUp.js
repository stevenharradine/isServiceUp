var CONFIG       = require("./config"),
    request      = require('request'),
    Cheerio      = require('cheerio'),
    nodemailer   = require("nodemailer"),
    url          = "http://heartbeat.skype.com/",
    isError      = false

request(url, function (error, response, body) {
  if (error) {
    return console.log (error)
  }

  if (!error && response.statusCode == 200) {
    dom = Cheerio.load(body)

    dom("#content").find(".post").each (function (i, el) {
      if (dom(this).find (".post-status").find(".issue-ongoing").length) {
        isError = true
      }
    })

    if (isError) {
      console.log ("Error")
    } else {
      var transporter  = nodemailer.createTransport({
        service: CONFIG.EMAIL_PROVIDER,
        auth: {
          user: CONFIG.EMAIL_USER,
          pass: CONFIG.EMAIL_PASSWORD
        }
      }),
      mailOptions = {               // setup e-mail data with unicode symbols
        from: "Skype Watch ✔ <Skype-Watch@alert.com>", // sender address
        to: CONFIG.ToEmail,             // list of receivers
        subject: "Skype is back up",   // Subject line
        text: "Skype is back up",               // plaintext body
        html: "Skype is back up"                // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if (error){
          console.log(error)
        } else {
          console.log("Message sent: " + info.response)
        }
      })
    }
  }
})