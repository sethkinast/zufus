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

  register(user) {
    if (this.leader.id === user.id || this.players.some(player => player.id === user.id)) {
      return `${user} you're already registered for this raid.`;
    }

    this.players.push(user);

    if (this.players.length <= NUM_RAIDERS) {
      return `${user} OK, you're registered for the raid.`;
    } else {
      return `${user} the raid is full but you are on standby.`;
    }
  }

  unregister(user) {
    let position = this.players.findIndex(player => player.id === user.id);
    if (position !== -1) {
      this.players.splice(position, 1);
      return `${user} you're no longer signed up for this raid.`;
    }
    return `${user} you don't seem to be signed up for this raid anyways.`;
  }

  unregisterByName(username) {
    let position = this.players.findIndex(player => player.name === username);
    if (position !== -1) {
      this.players.splice(position, 1);
      return `${username} has been removed from the raid.`;
    }
    return `${username} is not signed up for this raid.`;
  }

  toString() {
    let res = [`The next raid is **${this.time}**`, `**Leader:** ${this.leader.name}`];
    return res.concat(this.getRegistered());
  }

  getRegistered() {
    let res = [];
    let players = this.players.slice(0, NUM_RAIDERS);
    let standby = this.players.slice(NUM_RAIDERS);
    if (players.length) {
      res.push(`**Registered:** ${players.map(player => player.name).join(', ')}`);
    }
    if (standby.length) {
      res.push(`**Standby:** ${standby.map(player => player.name).join(', ')}`);
    }
    return res;
  }
};
