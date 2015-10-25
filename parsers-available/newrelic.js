module.exports.name = "New Relic"
module.exports.url = "https://status.newrelic.com/"

module.exports.parse = function (dom) {
  return dom(".page-status .status").text().trim()
}