const Command = require('../Command.js');

module.exports = new Command(['pls', 'plz'], function(message) {
  Command.discord.replyTo(message, '(⌐■_■) deal with it');
});
