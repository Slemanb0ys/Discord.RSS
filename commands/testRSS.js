const getRSS = require('../rss/rss.js')
const checkValidConfig = require('../util/configCheck.js')
const sqlCmds = require('../rss/sql/commands.js')
const sqlConnect = require('../rss/sql/connect.js')

module.exports = function (message, rssIndex) {
  var guildRSS = require(`../sources/${message.guild.id}.json`)
   let rssList = guildRSS.sources
  // var rssList = {
  //   guild: `(${message.channel.id + ".json"}, ${message.guild.name})`,
  //   source: guildRSS.sources
  // }

  //var rssList = []
  rssList[rssIndex].guild = `(${message.guild.id}, ${message.guild.name})`
  rssList[rssIndex].source = guildRSS.sources[rssIndex]

  var con = sqlConnect(getTestMsg);

  message.channel.startTyping();
  function getTestMsg() {
    getRSS(con, rssList, rssIndex, message.channel, true, function () {
      sqlCmds.end(con, function(err) {
        // console.log("RSS Info: Finished feed retrieval cycle.")
      });
    });
  }

}
