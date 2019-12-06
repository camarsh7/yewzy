const { prefix, primary_color } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List of all of my commands or information about a specific command',
  cooldown: 5,
  aliases: ['commands'],
  usage: ['<command name>'],
  execute(message, args) {
    const data = [];
    const { commands } = message.client;
    let usage = "";
    let aliasesText = "";

    if (!args.length) {
      let cmdlist = commands.map(command => command.name);

      const exampleEmbed = new Discord.RichEmbed()
    	.setColor(primary_color)
    	.setTitle('Need help?')
    	.setURL('https://discord.js.org/')
    	.setAuthor('Yewzy', 'https://images.squarespace-cdn.com/content/v1/5c3196b2ee1759e79275f898/1546907976530-JKNNPFDGHR2JB1R4SIAP/ke17ZwdGBToddI8pDm48kHrGQXo3JSrgKo9RQJS6t5RZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7TtM594zIdQAwli_U78u76IALgu1ss1RsRZ7c8GVhl_6qnRYZ6w14sKMHXpkAHhfHg/favicon.ico', 'https://yewzofficial.com')
    	.setDescription('Check out my list of commands below!')
    	.setThumbnail('https://images.squarespace-cdn.com/content/5c3196b2ee1759e79275f898/1546906698212-5916QXVUSBM4WP4EYZ4P/yewz_wider.png?content-type=image%2Fpng');

      for (var i = 0; i < cmdlist.length; i++) {
        exampleEmbed.addField("**" + prefix + cmdlist[i] + "**", commands.get(cmdlist[i]).description)
      }

    	exampleEmbed.addBlankField()
    	.addField('Still lost?', `You can send \`${prefix}help [command name]\` to get info on a specific command!`)
      .setTimestamp()
    	.setFooter('Property of Yewz', 'https://images.squarespace-cdn.com/content/v1/5c3196b2ee1759e79275f898/1546907976530-JKNNPFDGHR2JB1R4SIAP/ke17ZwdGBToddI8pDm48kHrGQXo3JSrgKo9RQJS6t5RZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7TtM594zIdQAwli_U78u76IALgu1ss1RsRZ7c8GVhl_6qnRYZ6w14sKMHXpkAHhfHg/favicon.ico');

      message.channel.send(exampleEmbed);

      return;
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
    	return message.reply('that\'s not a valid command!');
    }
    if (command.aliases) {
      aliasesText = `${command.aliases.join(', ')}`;
    } else {
      aliasesText = "There are no aliases for this command!";
    }
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) { usage = `${command.usage}`; }

    const exampleEmbed = new Discord.RichEmbed()
    	.setColor('DARK_GREEN')
    	.setTitle('Need more help?')
    	.setURL('https://discord.js.org/')
    	.setAuthor('Yewzy', 'https://images.squarespace-cdn.com/content/v1/5c3196b2ee1759e79275f898/1546907976530-JKNNPFDGHR2JB1R4SIAP/ke17ZwdGBToddI8pDm48kHrGQXo3JSrgKo9RQJS6t5RZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7TtM594zIdQAwli_U78u76IALgu1ss1RsRZ7c8GVhl_6qnRYZ6w14sKMHXpkAHhfHg/favicon.ico', 'https://yewzofficial.com')
    	.setDescription('Use !help for my list of commands and what they do!')
    	.setThumbnail('https://images.squarespace-cdn.com/content/5c3196b2ee1759e79275f898/1546906698212-5916QXVUSBM4WP4EYZ4P/yewz_wider.png?content-type=image%2Fpng')
      .addBlankField()
      .addField("**" + prefix + command.name + "** - " + `Usage:`+ "`" + `${prefix}${command.name} ` + usage + "`", "Description: " + command.description)
      .addField("**Aliases:** " , aliasesText)
      .addBlankField()
      .setTimestamp()
    	.setFooter('Property of Yewz', 'https://images.squarespace-cdn.com/content/v1/5c3196b2ee1759e79275f898/1546907976530-JKNNPFDGHR2JB1R4SIAP/ke17ZwdGBToddI8pDm48kHrGQXo3JSrgKo9RQJS6t5RZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7TtM594zIdQAwli_U78u76IALgu1ss1RsRZ7c8GVhl_6qnRYZ6w14sKMHXpkAHhfHg/favicon.ico');

    message.channel.send(exampleEmbed);
  },
};
