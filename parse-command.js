const COMMAND_IDENTIFIER = '/raid';
const BOT_SNOWFLAKE = '189546691475668992';

module.exports = function parseCommand(message) {
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

  if (!command[0].length) {
    command = ['help'];
  }

  const parsedCommand = {
    command: command[0],
    args: command.slice(1)
  };

  return parsedCommand;
};
