const { staff_roles, reaction_roles, roles_channel, role_message } = require('../config.json');
module.exports = {
  name: 'reactions',
  description: 'init reactions',
  cooldown: 5,
  execute(message, args, client) {
    let roleChannel = client.channels.find(ch => ch.name === roles_channel);
    roleChannel.send(role_message).then(sent => {
      reaction_roles.forEach(async reactionPair => {
        await sent.react(reactionPair.emote).catch(console.error);
        let roleName = reactionPair.name;
        let role = message.guild.roles.find(role => role.name.toUpperCase() === roleName.toUpperCase());

        if(!role)
          role = message.guild.createRole({
            name: roleName
          }).catch(console.error);
      }).catch(console.error);
    }).catch(console.error);
  },
};
