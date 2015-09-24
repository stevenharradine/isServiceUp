module.exports.name = "GitHub"
module.exports.url = "https://status.github.com/"

module.exports.parse = function (dom) {
  var isError = true

  if (dom("#latest-message").find("#message").text().trim() == "All systems operational") {
    isError = false
  }

  return isError
}