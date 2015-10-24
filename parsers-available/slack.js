module.exports.name = "Slack"
module.exports.url = "https://status.slack.com/"

module.exports.parse = function (dom) {
  return dom(".current_status h1").text().trim()
}