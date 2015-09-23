module.exports.name = "Skype"
module.exports.url = "http://heartbeat.skype.com/"

module.exports.parse = function (dom) {
  var isError = false

  dom("#content").find(".post").each (function (i, el) {
    if (dom(this).find (".post-status").find(".issue-ongoing").length) {
      isError = true
    }
  })

  return isError
}