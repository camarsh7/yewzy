const fs = require('fs');
const Discord = require('discord.js');
const Parser = require('rss-parser');
const { feed } = 'https://twitrss.me/twitter_user_to_rss/?user=yewzofficial';
const { prefix, token, roles_channel, role_message, reaction_roles } = require('./config.json');
const config = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	const tweetChannel = client.channels.get('631973964780142652');
	client.user.setActivity('YEWZ', { type: 'LISTENING'});
});

client.login(token);

client.on('messageReactionAdd', (reaction, user) => {
	if(!user) return;
	if(user.bot) return;
	if(!reaction.message.channel.guild) return;

	reaction_roles.forEach(reactionPair => {
		if(reactionPair.emote === reaction.emoji.name) {
			console.log(reactionPair.name);
			let role = reaction.message.guild.roles.find(r => r.name === reactionPair.name);
			reaction.message.guild.member(user).addRole(role).catch(console.error);
		}
	});
	//let role = reaction.message.guild.roles.find(r => r.name == r)

});

let parser = new Parser();
let latestTweet;
setInterval(function() {
	(async () => {
		try {
			let feed = await parser.parseURL('https://twitrss.me/twitter_user_to_rss/?user=yewzofficial');
			console.log(feed.title);
			var tweet = feed.items[2];

			if(tweet.link != latestTweet){
				client.channels.get('631973964780142652').send(tweet.link);
				latestTweet = tweet.link;
			}
		} catch (e) {
			console.log(e);
		}

		})();
}, 60 * 1000 * 15);

client.on('message', message => {
  if (!message.content.startsWith(prefix) || !message.guild || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  if (commandName === "ping" || client.commands.get("ping").aliases.includes(commandName)) {
    args[0] = client.ping;
  }

  const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) { return; }

  if (command.guildOnly && message.channel.type !== 'text') {
	   return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
  	cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

  	if (now < expirationTime) {
  		const timeLeft = (expirationTime - now) / 1000;
  		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
  	}
  }

  timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
  	command.execute(message, args, client);
  } catch (error) {
  	console.error(error);
  	message.reply('there was an error trying to execute that command!');
  }
});
