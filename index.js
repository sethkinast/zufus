const Discord = require('discord.js');
const CommandSet = require('./src/CommandSet.js');

const API_TOKEN = require('fs').readFileSync('./API_TOKEN', 'utf8').trim();
const zufus = new Discord.Client({
  autoReconnect: true
});

const commands = new CommandSet('commands');

/*
function handleRegister(user) {
  if (!currentRaid || currentRaid.complete) {
    return `${user} no raid to register for right now :(`;
  }
  return currentRaid.register(user);
}

function handleUnregister(user, args) {
  if (args[0] && isAdmin(user)) {
    return currentRaid.unregisterByName(args[0]);
  }
  if (!currentRaid || currentRaid.complete) {
    return `${user} no raid to remove you from-- you're free`;
  }
  return currentRaid.unregister(user);
}*/

zufus.on('message', message => {
  if (!message.author.equals(zufus.user)) {
    commands.executeCommandForMessage(message);
  }
});
zufus.loginWithToken(API_TOKEN);
