const requireDir = require('requiredir');

const COMMAND_IDENTIFIER = '/raid';
const BOT_SNOWFLAKE = '189546691475668992';

class CommandSet {
  constructor(dir) {
    this.commands = requireDir(dir).toArray();
  }

  add(...commands) {
    this.commands.push(...commands);
  }

  find(command, args) {
    if (!command) return;
    const { response } = this.commands.find(commandObj => commandObj.matches(command, args)) || {};
    return response;
  }

  getCommandForMessage(message) {
    let { command, args } = CommandSet.parseMessage(message);
    return this.find(command, args);
  }

  executeCommandForMessage(message) {
    let { command, args } = CommandSet.parseMessage(message);
    let handler = this.find(command, args);
    if (handler) {
      handler.call(command, message, args);
      return true;
    }
  }

  static parseMessage(message) {
    let command;
    let content = message.cleanContent;

    if (message.channel.isPrivate) {
      command = content.split(' ');
    } else if (content.startsWith(COMMAND_IDENTIFIER)) {
      command = content.substr(COMMAND_IDENTIFIER.length + 1).split(' ');
    } else if (message.isMentioned(BOT_SNOWFLAKE)) {
      try {
        command = content.match(/(^|\s)(\w+)/g).map(s => s.trim());
      } catch (e) {
        return {};
      }
    } else {
      return {};
    }

    return {
      command: command[0],
      args: command.slice(1)
    };
  }
}

module.exports = CommandSet;
