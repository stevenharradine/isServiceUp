var fs           = require('fs'),
    sys          = require('sys'),
    exec         = require('child_process').exec,
    getFilesSync = require('./libs/getFilesSync').getFilesSync

installDependancies ("package.json")
getFilesSync ("alerts", [], "package.json").forEach (function (package_path, index, array) {
  installDependancies (package_path)
})

function installDependancies (package_path) {
  var data = require ("./" + package_path),
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
}
