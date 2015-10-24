module.exports.name = "Xbox Live"
module.exports.url = "http://support.xbox.com/en-CA/xbox-live-status"

module.exports.parse = function (dom) {
  var isError = true

  dom(".service").each (function (i, el) {
    if (dom(this).attr("class", "active").length) {
      isError = false
    }
  })

  return isError ? "Some issues" : "Should be working"
}