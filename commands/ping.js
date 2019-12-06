module.exports = {
  name: 'ping',
  description: 'Pong!',
  cooldown: 5,
  aliases: ['latency', 'delay'],
  execute(message, args, client) {
    message.channel.send("Ping?").then((m) => {
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }).catch(error => {
      message.channel.send(`Error: ${error}`);
    });
  },
};
