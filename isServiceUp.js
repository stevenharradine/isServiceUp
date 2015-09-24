var CONFIG       = require("./config"),
    request      = require('request'),
    Cheerio      = require('cheerio'),
    nodemailer   = require("nodemailer")
    parser       = require ("./parsers/" + process.argv[2] + ".js")

request(parser.url, function (error, response, body) {
  if (error) {
    return console.log (error)
  }

  if (!error && response.statusCode == 200) {
    if (parser.parse (Cheerio.load(body))) {
      console.log ("Error")
    } else {
      sendEmails (parser.name + " is back up", function () {
        console.log ("done")
      })
    }
  }
})

function sendEmails (subject, callback) {
  var sentMailCounter = 0,
      transporter     = nodemailer.createTransport({
    service: CONFIG.EMAIL_PROVIDER,
    auth: {
      user: CONFIG.EMAIL_USER,
      pass: CONFIG.EMAIL_PASSWORD
    }
  })

  CONFIG.EMAIL_LIST.forEach (function (emailAddress, index, array) {
    var mailOptions = {               // setup e-mail data with unicode symbols
      from: "Service Watch ✔ <Service-Watch@alert.com>", // sender address
      to: emailAddress,             // list of receivers
      subject: subject,   // Subject line
      text: subject,               // plaintext body
      html: subject                // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if (error){
        console.log(error)
      } else {
        console.log("Message sent: " + info.response)
      }

      if (++sentMailCounter == CONFIG.EMAIL_LIST.length) {
        callback ()
      }
    })
  })
}
