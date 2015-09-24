var CONFIG       = require("./config"),
    fs           = require('fs')
    request      = require('request'),
    Cheerio      = require('cheerio'),
    nodemailer   = require("nodemailer"),
    parser       = require ("./parsers/" + process.argv[2] + ".js")

request(parser.url, function (error, response, body) {
  if (error) {
    return console.log (error)
  }

  if (!error && response.statusCode == 200) {
    var isError    = parser.parse (Cheerio.load(body)),
        statusFile = "./" + parser.name + ".status"

    readStatus (statusFile, isError, function (currentStatus) {
      console.log (currentStatus)
      if (JSON.parse (currentStatus) != isError) {
        writeStatus (statusFile, isError, function () {
          alert (isError)
        })
      }
    })
  }
})

function readStatus (statusFile, isError, callback) {
  fs.readFile(statusFile, 'utf-8', function (err, currentStatus) {
    if(err) {
      writeStatus (statusFile, isError, function () {
        alert (isError)
      })
    } else {
      callback (currentStatus)
    }
  })
}

function alert (isError) {
  sendEmails (parser.name + " is " + (isError ? "down" : "up"), function () {
    console.log ("done")
  })
}

function writeStatus (statusFile, isError, callback) {
  fs.writeFile(statusFile, isError, function(err) {
    if(err) {
      return console.log(err)
    }

    console.log ("Status file updated")

    callback ()
  })
}

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
      to: emailAddress,               // list of receivers
      subject: subject,               // Subject line
      text: subject,                  // plaintext body
      html: subject                   // html body
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
