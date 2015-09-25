var fs   = require('fs'),
    sys  = require('sys'),
    exec = require('child_process').exec

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

function getFilesSync (dir, files_, filter){
    files_ = files_ || []
    var files = fs.readdirSync(dir)

    for (var i in files){
        var name = dir + '/' + files[i]

        if (fs.statSync(name).isDirectory()){
          getFilesSync(name, files_, filter)
        } else {
          if (filter && filter.length > 0 && name.indexOf (filter) >= 0) {
            files_.push(name)
          } else if (!filter || filter && ! (filter.length > 0)) {
            files_.push(name)
          }
        }
    }

    return files_
}