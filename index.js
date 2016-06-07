const Discord = require('discord.js');
const chrono = require('chrono-node');
const zufus = new Discord.Client();

const COMMAND_IDENTIFIER = '/raid';

zufus.on("message", function(message) {
  if (message.content.startsWith(COMMAND_IDENTIFIER)) {
    let command = message.content.substr(COMMAND_IDENTIFIER.length).split[' '];
    switch (command[0]) {
      case 'join':
        raid.addMember(message.author.name);
        zufus.sendMessage(message.channel, raid);
        break;
      case 'start':
        if (channel.permissionsOf(message.author).hasPermission("manageServer")) {
          const date = chrono.parseDate(command[1])
          raid = new Raid(message.author, date);
          zufus.sendMessage(message.channel, `OK, set up a raid for ${date}`);
        }
    }
  }
});

zufus.loginWithToken("MTg5NTQ2NjkxNDc1NjY4OTky.CjfHLA.J6GnetujTa3IXjssrGrynYGFipA");
