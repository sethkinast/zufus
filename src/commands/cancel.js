const Command = require('../Command.js');
const RaidManager = require('../RaidManager.js');

module.exports = new Command('cancel', function(message) {
  if (Command.discord.isAdmin(message.author)) {
    RaidManager.cancelRaid();
    Command.discord.setStatus(message.client, false, null);
    Command.discord.pmReplyTo(message, 'Raid cancelled');
  } else {
    Command.discord.pmReplyTo(message, 'You can\'t cancel raids... who do you think you are?');
  }
});
