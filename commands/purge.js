const { staff_roles } = require('../config.json');

module.exports = {
	name: 'purge',
	description: 'Purges messages within a channel, up to 100 at a time.',
  args: true,
  usage: '<number of messages>',
  cooldown: 5,
	execute(message, args) {
		if(!message.member.roles.some(r => staff_roles.includes(r.name)))
			return message.reply("you cannot use this command!");
			
		const numToDelete = args[0];

    if(!numToDelete) {
      return message.reply("Please provide a number up to 100 for the number of messages to purge.");
    }

    message.channel.bulkDelete(numToDelete).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	},
};
