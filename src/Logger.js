class Logger {
  init(client) {
    this.client = client;
    this.channel = client.channels.get('name', 'zufus-log');
  }

  log(message, level=Logger.INFO) {
    this.client.sendMessage(this.channel, `[${level}] ${message}`);
  }

  error(message) {
    this.log(message, Logger.ERROR);
  }

  debug(message) {
    this.log(message, Logger.DEBUG);
  }
}

Logger.INFO = 'INFO';
Logger.ERROR = 'ERROR';
Logger.DEBUG = 'DEBUG';

module.exports = new Logger();
