const { staff_roles, muted_role } = require('../config.json');

module.exports = {
	name: 'unmute',
	description: 'Unmutes a user so they can continue chatting.',
  cooldown: 5,
  args: true,
  usage: '<user>',
	execute(message, args) {

		if(!message.member.roles.some(r => staff_roles.includes(r.name)))
			return message.reply("you cannot use this command!");

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if(!member)
			return message.reply("the provided member is invalid.");

		let roleName = muted_role;
		let role = message.guild.roles.find(role => role.name.toUpperCase() === roleName.toUpperCase());

		if(!role)
			return message.reply("the provided role is invalid. Do you have a Muted role?");

		member.removeRole(role);
		message.channel.send(`${member} has had the \`${roleName}\` role revoked!`);
	},
};
