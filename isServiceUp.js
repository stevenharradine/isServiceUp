var CONFIG       = require("./config"),
    fs           = require('fs')
    request      = require('request'),
    Cheerio      = require('cheerio'),
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
  require ('./alerts/' + CONFIG.ALERT_METHOD + ".js").alert(isError, function () {
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
