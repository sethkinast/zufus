const chrono = require('chrono-node');

const NUM_RAIDERS = 7; // plus RL

module.exports = class Raid {
  constructor(leader, timeish) {
    this.leader = leader;
    this.time = Raid.parseTimeish(timeish);
    this.players = [];
  }

  static parseTimeish(timeish) {
    return chrono.parseDate(timeish);
  }

  get complete() {
    return this.time < Date.now();
  }

  register(user) {
    if (this.leader.id === user.id || this.players.some(player => player.id === user.id)) {
      return `Maybe you should have a cone on your head too, ${user}. You're already registered for this raid!`;
    }

    this.players.push(user);

    if (this.players.length <= NUM_RAIDERS) {
      return `You're now registered for ${this.leader.name}'s raid. Please show up 10 minutes before the start time to ensure your spot.`;
    } else {
      return 'The raid is full but you are on standby. Personally, I like to chase my tail a little while I wait.';
    }
  }

  unregister(user) {
    let position = this.players.findIndex(player => player.id === user.id);
    if (position !== -1) {
      this.players.splice(position, 1);
      return `Way to be a quitter, ${user}. You're no longer signed up for this raid.`;
    }
    return `You're even bad at quitting, ${user}; you're not even signed up for this raid.`;
  }

  unregisterByName(username) {
    let position = this.players.findIndex(player => player.name === username);
    if (position !== -1) {
      this.players.splice(position, 1);
      return `I just 86'd ${username} from the raid.`;
    }
    return `At least I'm hourly... ${username} wasn't signed up anyway.`;
  }

  toString() {
    let res = [`The next raid is **${this.time}**`, `**Leader:** ${this.leader.name}`];
    return res.concat(this.getRegisteredString());
  }

  getPlayers() {
    return this.players.slice(0, NUM_RAIDERS);
  }

  getStandby() {
    return this.players.slice(NUM_RAIDERS);
  }

  getRegisteredString() {
    let res = [];
    let players = this.getPlayers();
    let standby = this.getStandby();
    if (players.length) {
      res.push(`**Registered:** ${players.map(player => player.name).join(', ')}`);
    }
    if (standby.length) {
      res.push(`**Standby:** ${standby.map(player => player.name).join(', ')}`);
    }
    return res;
  }

};
