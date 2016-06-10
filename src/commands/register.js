const Command = require('../Command.js');
const RaidManager = require('../RaidManager.js');

module.exports = new Command('register', function(message) {
  let { raid } = RaidManager;
  if (!raid || raid.complete) {
    Command.discord.pmReplyTo(message, 'No raid to register for right now :(');
  } else {
    Command.discord.pmReplyTo(message, raid.register(message.author));
    Command.discord.setStatus(message.client, true, RaidManager.getStatus());
  }
});
