var fs           = require('fs')

module.exports.getFilesSync = function (dir, files_, filter){
    files_ = files_ || []
    var files = fs.readdirSync(dir)

    for (var i in files){
        var name = dir + '/' + files[i]

        if (fs.statSync(name).isDirectory()){
          module.exports.getFilesSync (name, files_, filter)
        } else {
          if (filter && filter.length > 0 && name.indexOf (filter) >= 0) {
            files_.push(name)
          } else if (!filter || filter && !(filter.length > 0)) {
            files_.push(name)
          }
        }
    }

    return files_
}