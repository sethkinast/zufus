const Command = require('../Command.js');
const RaidManager = require('../RaidManager.js');

module.exports = new Command('start', function(message, timeish) {
  if (timeish.length) {
    timeish = timeish.join(' ');
  } else {
    timeish = undefined;
  }
  if (Command.discord.isAdmin(message.author)) {
    let raid = RaidManager.startRaid(message.author, timeish);
    Command.discord.setStatus(message.client, true, RaidManager.getStatus());
    Command.discord.sayTo(message, raid.toString());
  } else {
    Command.discord.pmReplyTo(message, 'You can\'t start raids... the power might go to your head!');
  }
});
