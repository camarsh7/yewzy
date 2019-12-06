const { staff_roles } = require('../config.json');

module.exports = {
	name: 'ban',
	description: 'Get that user out of here (permanently)!',
	cooldown: 5,
  args: true,
  usage: '<user>',
  guildOnly: true,
	execute(message, args) {

		if(!message.member.roles.some(r => staff_roles.includes(r.name)))
			return message.reply("You cannot use this command!");

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if(!member)
			return message.reply("The provided member is invalid. Did they leave already?");
		if(!member.kickable)
			return message.reply("I cannot ban this user. They have some weird force field around them...");

		let reason = args.slice(1).join(' ');
		if(!reason)
			reason = "No reason at all.";

		member.ban(reason).catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
		message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} becase: ${reason}`);
	},
};
