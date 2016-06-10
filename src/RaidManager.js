const Raid = require('./Raid.js');
const DEFAULT_START_TIME = '8:30pm';

class RaidManager {
  constructor() {
    this.raid = undefined;
  }

  startRaid(leaderUser, timeish=DEFAULT_START_TIME) {
    this.raid = new Raid(leaderUser, timeish);
    return this.raid;
  }

  cancelRaid() {
    this.raid = undefined;
  }

  getRaidInfo() {
    if (this.raid) {
      return this.raid.toString();
    }
  }

  getStatus() {
    if (this.raid) {
      if (this.raid.players.length < 8) {
        return `Raid Open (${this.raid.getPlayers().length + 1}/8)`;
      } else {
        let standbyCount = this.raid.getStandby().length;
        let standby = standbyCount? `+${standby} Standby` : '';
        return `Raid Full ${standby}`;
      }
    }
  }
}

module.exports = new RaidManager();
