const Command = require('../Command.js');

module.exports = new Command('help', function(message) {
  Command.discord.pmReplyTo(message, [
    '`register` - Sign up for the next raid',
    '`unregister` - Cancel your signup',
    '`info` - Show details for the next raid'
  ]);
});
