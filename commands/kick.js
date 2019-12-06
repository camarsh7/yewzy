const { staff_roles } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Get that user out of here (temporarily)!',
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
			return message.reply("I cannot kick this user. They have some weird force field around them...");

		let reason = args.slice(1).join(' ');
		if(!reason)
			reason = "No reason at all.";

		member.kick(reason).catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
		message.reply(`${member.user.tag} has been kicked by ${message.author.tag} becase: ${reason}`);
	},
};
