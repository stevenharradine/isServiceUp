var fs           = require('fs'),
    sys          = require('sys'),
    exec         = require('child_process').exec,
    getFilesSync = require('./libs/getFilesSync').getFilesSync

exec ("npm install", function (error, stdout, stderr) {
  if (error) {
    buffered_out += error
  }

  console.log (stdout)
  getFilesSync ("alerts", [], "package.json").forEach (function (alert, index, array) {
    var data = require ("./" + alert),
        keys = Object.keys(data.dependencies)

      keys.forEach (function (dependency, index, array) {
        var cmd = "npm install " + dependency
        console.log (cmd)
        exec (cmd, function (error, stdout, stderr) {
          if (error) {
            buffered_out += error
          }

          console.log (stdout)
        })
      })
  })
})
