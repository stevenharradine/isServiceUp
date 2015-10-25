module.exports.name = "BitBucket"
module.exports.url = "http://status.bitbucket.org/"

module.exports.parse = function (dom) {
  return dom(".status-index").find(".container").find(".page-status").find(".status").text().trim()
}
