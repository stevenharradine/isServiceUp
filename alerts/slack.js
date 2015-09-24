var CONFIG       = require("./../config"),
    Slack        = require("node-slack"),
    slack        = new Slack("https://hooks.slack.com/services/" + CONFIG.SLACK_TOKEN)

module.exports.alert = function (isError, callback) {
  var sentCounter = 0,
      subject     = parser.name + " is " + (isError ? "down" : "up")

  CONFIG.ALERT_LIST.forEach (function (slackChannel, index, array) {
    slack.send({
      text: subject,
      channel: slackChannel,
      username: "Service Watch"
    }, function (error) {
      if (error != null && error.message != null) {
        console.log ("Slack: " + error.message)
      }

      if (++sentCounter == CONFIG.ALERT_LIST.length) {
        callback ()
      }
    })
  })
}