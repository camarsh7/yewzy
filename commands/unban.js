const { staff_roles } = require('../config.json');

module.exports = {
	name: 'unban',
	description: 'Unbans specified user from the guild.',
  args: true,
  usage: '<user snowflake>',
  cooldown: 5,
	execute(message, args) {

    if(!message.member.roles.some(r => staff_roles.includes(r.name)))
			return message.reply("You cannot use this command!");

		const bannedUser = args[0];

    if(!bannedUser) {
      return message.reply("Please provide a user to unban");
    }

    message.guild.unban(bannedUser).then((bannedUser) => {
      message.channel.send(`${bannedUser} has been given another chance.`);
    }).catch((error) => {
      message.channel.send(`Error: ${error}`);
    });
	},
};
