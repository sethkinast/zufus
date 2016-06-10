module.exports = {
  isAdmin(user) {
    return user.client.servers.some(
      server => server.rolesOfUser(user).some(role => role.name === 'Admin')
    );
  },

  /**
   * Say a message in the same channel that `message` came from
   */
  sayTo(message, reply) {
    message.client.sendMessage(message.channel, reply);
  },

  /**
   * Reply to a user in the same channel that `message` came from
   */
  replyTo(message, reply) {
    if (Array.isArray(reply)) {
      reply[0] = message.author + ' ' + reply[0];
    } else {
      reply = message.author + ' ' + reply;
    }
    message.client.sendMessage(message.channel, reply);
  },

  /**
   * Send a DM the user we're responding to
   */
  pmReplyTo(message, reply) {
    message.client.sendMessage(message.author, reply);
  },

  setStatus(client, status, text) {
    client.setStatus(status? 'online' : 'idle', text);
  }
};
