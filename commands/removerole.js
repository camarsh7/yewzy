const { staff_roles } = require('../config.json');

module.exports = {
	name: 'removerole',
	description: 'Revokes a user\'s pecific role.',
  cooldown: 5,
  args: true,
  usage: '<user> <role>',
	execute(message, args) {

		if(!message.member.roles.some(r => staff_roles.includes(r.name)))
			return message.reply("you cannot use this command!");

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if(!member)
			return message.reply("the provided member is invalid.");

		let roleName = args[1];

		if(!roleName)
			return message.reply("please provide the name of a role to remove from the user.");

		let role = message.guild.roles.find(role => role.name.toUpperCase() === roleName.toUpperCase());

		if(!role)
			return message.reply("the provided role is invalid.");

		message.member.removeRole(role);
		message.channel.send(`${member} has had the \`${roleName}\` role revoked!`);
	},
};
