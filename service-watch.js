var CONFIG       = require("./config"),
    fs           = require('fs'),
    request      = require('request'),
    Cheerio      = require('cheerio'),
    getFilesSync = require('./libs/getFilesSync').getFilesSync

getFilesSync('parsers-enabled').forEach (function (parser_name, index, array) {
  var parser = require ("./" + parser_name)

  request(parser.url, function (error, response, body) {
    if (error) {
      return console.log (error)
    }

    if (!error && response.statusCode == 200) {
      var isError    = parser.parse (Cheerio.load(body)),
          statusFile = "./" + parser.name + ".status"

      readStatus (statusFile, parser, isError, function (currentStatus) {
        if (currentStatus != isError) {
          writeStatus (statusFile, isError, function () {
            alert (parser, isError)
          })
        }
      })
    }
  })
})

function readStatus (statusFile, parser, isError, callback) {
  fs.readFile(statusFile, 'utf-8', function (err, currentStatus) {
    if(err) {
      writeStatus (statusFile, isError, function () {
        alert (parser, isError)
      })
    } else {
      callback (currentStatus)
    }
  })
}

function alert (parser, isError) {
  var package_path  = "./alerts/" + CONFIG.ALERT_METHOD + "/" + CONFIG.ALERT_METHOD + ".js"
      alert_message = parser.name + ": " + isError

  require (package_path).alert(alert_message, isError, function () {
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
