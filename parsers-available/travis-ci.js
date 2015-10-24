module.exports.name = "Travis CI"
module.exports.url = "https://www.traviscistatus.com/"

module.exports.parse = function (dom) {
  return dom(".page-status .status").text().trim()
}