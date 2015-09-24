module.exports.name = "BitBucket"
module.exports.url = "http://status.bitbucket.org/"

module.exports.parse = function (dom) {
  var isError = false

  if (dom(".status-index").find(".container").find(".page-status").find(".status").text().trim() == "All systems operational") {
    isError = true
  }

  return isError
}