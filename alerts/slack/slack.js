var CONFIG       = require("./../../config"),
    SLACK_CONFIG = require("./config"),
    Slack        = require("node-slack"),
    slack        = new Slack("https://hooks.slack.com/services/" + SLACK_CONFIG.SLACK_TOKEN)

module.exports.alert = function (subject, isError, callback) {
  var sentCounter = 0

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