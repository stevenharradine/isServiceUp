var request      = require('request'),
    Cheerio      = require('cheerio'),
    url          = "http://heartbeat.skype.com/",
    isError      = false

request(url, function (error, response, body) {
  if (error) {
    return console.log (error)
  }

  if (!error && response.statusCode == 200) {
    dom = Cheerio.load(body)

    dom("#content").find(".post").each (function (i, el) {
      if (dom(this).find (".post-status").find(".issue-ongoing").length) {
        isError = true
      }
    })

    if (isError) {
      console.log ("Error")
    }
  }
})