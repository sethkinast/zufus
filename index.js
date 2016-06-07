const Discord = require('discord.js');

const parseCommand = require('./parse-command');
const Raid = require('./Raid');

const zufus = new Discord.Client();
const handlers = {
  register: handleRegister,
  unregister: handleUnregister,
  start: handleStart,
  cancel: handleCancel,
  help: handleHelp,
  info: handleInfo,
  pls: handlePls,
  plz: handlePls
};

const DEFAULT_START_TIME = '8:30pm';

let currentRaid;

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
}

function handleStart(user, args) {
  let timeish = args.join(' ') || DEFAULT_START_TIME;
  if (isAdmin(user)) {
    currentRaid = new Raid(user, timeish);
    return currentRaid.toString();
  }
}

function handleCancel() {
  currentRaid = undefined;
  return 'The raid has been cancelled :(';
}

function handleInfo() {
  if (currentRaid) {
    return currentRaid.toString();
  }
  return 'No raid is scheduled at the moment.';
}

function handleHelp() {
  return [
    '`register` - Sign up for the next raid',
    '`unregister` - Cancel your signup',
    '`info` - Show details for the next raid'
  ];
}

function handlePls(user) {
  return `${user} (⌐■_■) deal with it`;
}

function isAdmin(user) {
  return zufus.servers[0].rolesOfUser(user).some(role => role.name === 'Admin');
}

zufus.on('message', function(message) {
  const { command, args } = parseCommand(message);
  const handler = handlers[command];
  if (handler) {
    const ret = handler(message.author, args);
    if (ret) {
      zufus.sendMessage(message, ret);
    }
  }
});

zufus.loginWithToken('MTg5NTQ2NjkxNDc1NjY4OTky.CjfHLA.J6GnetujTa3IXjssrGrynYGFipA');
