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
      var transporter  = nodemailer.createTransport({
        service: CONFIG.EMAIL_PROVIDER,
        auth: {
          user: CONFIG.EMAIL_USER,
          pass: CONFIG.EMAIL_PASSWORD
        }
      }),
      mailOptions = {               // setup e-mail data with unicode symbols
        from: "Service Watch ✔ <Service-Watch@alert.com>", // sender address
        to: CONFIG.ToEmail,             // list of receivers
        subject: parser.name + " is back up",   // Subject line
        text: parser.name + " is back up",               // plaintext body
        html: parser.name + " is back up"                // html body
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