require('dotenv').config();
const fs = require('fs')
const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix} = require('./config.json');
bot.commands = new Discord.Collection();
TOKEN = process.env.BOT_TOKEN
bot.login(TOKEN);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
  if(!msg.content.startsWith(prefix)||msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  if (!bot.commands.has(commandName)) return;

  try {
  	bot.commands.get(commandName).execute(msg, args);
  } catch (error) {
	  console.error(error);
	  bot.reply('there was an error trying to execute that command!');
  }

});
