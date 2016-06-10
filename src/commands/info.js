const Command = require('../Command.js');
const RaidManager = require('../RaidManager.js');

module.exports = new Command('info', function(message) {
  if (RaidManager.raid) {
    Command.discord.sayTo(message, RaidManager.raid.toString());
  } else {
    Command.discord.replyTo(message, 'No raid scheduled right now.');
  }
});
