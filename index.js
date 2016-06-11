const path = require('path');

const Discord = require('discord.js');
const CommandSet = require('./src/CommandSet.js');

const API_TOKEN = require('fs').readFileSync(path.resolve(__dirname, './API_TOKEN'), 'utf8').trim();
const zufus = new Discord.Client({
  autoReconnect: true
});

const commands = new CommandSet('commands');

zufus.on('message', message => {
  if (!message.author.equals(zufus.user)) {
    commands.executeCommandForMessage(message);
  }
});
zufus.loginWithToken(API_TOKEN);
