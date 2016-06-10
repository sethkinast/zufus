const discordUtils = require('./discord-utils.js');

class Command {
  constructor(trigger, response, opts) {
    if (!Array.isArray(trigger)) {
      trigger = [trigger];
    }
    this.trigger = trigger;
    this.response = response;
    this.opts = opts;
  }

  matches(command/*, args*/) {
    return this.trigger.some(trigger => trigger === command.toLowerCase());
  }
}

Command.discord = discordUtils;

module.exports = Command;
