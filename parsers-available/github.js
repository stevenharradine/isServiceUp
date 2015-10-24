module.exports.name = "GitHub"
module.exports.url = "https://status.github.com/"

module.exports.parse = function (dom) {
  return dom("#latest-message").find("#message").text().trim()
}