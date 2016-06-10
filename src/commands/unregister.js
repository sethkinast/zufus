const Command = require('../Command.js');
const RaidManager = require('../RaidManager.js');

module.exports = new Command('unregister', function(message, [user]) {
  let { raid } = RaidManager;
  if (user && Command.discord.isAdmin(message.author)) {
    Command.discord.replyTo(message, raid.unregisterByName(user));
    Command.discord.setStatus(message.client, true, RaidManager.getStatus());
  } else {
    if (!raid || raid.complete) {
      Command.discord.replyTo(message, 'no raid to remove you from-- you\'re freeeee!');
    } else {
      Command.discord.sayTo(message, raid.unregister(message.author));
      Command.discord.setStatus(message.client, true, RaidManager.getStatus());
    }
  }
});
