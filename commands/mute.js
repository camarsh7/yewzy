const { staff_roles, muted_role } = require('../config.json');

module.exports = {
	name: 'mute',
	description: 'Stops a user from chatting.',
	cooldown: 5,
  args: true,
  usage: '<user>',
  guildOnly: true,
	execute(message, args) {

		if(!message.member.roles.some(r => staff_roles.includes(r.name)))
			return message.reply("You cannot use this command!");

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);

		if(!member)
			return message.reply("the provided member is invalid.");

		let roleName = muted_role;
		let role = message.guild.roles.find(role => role.name.toUpperCase() === roleName.toUpperCase());

		if(!role)
			role = message.guild.createRole({
				name: muted_role,
				color: 'RED',
				permissions: [],
				position: 3,
			}).then(role => {
					member.addRole(role);

					message.guild.channels.forEach(channel => {
						channel.overwritePermissions(role, {'SEND_MESSAGES': false});
					});
			}).catch(console.error);
		else {
			member.addRole(role).catch(console.error);
		}
	},
};
