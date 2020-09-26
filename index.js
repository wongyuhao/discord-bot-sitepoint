require('dotenv').config();
const fs = require('fs')
const Discord = require('discord.js');
const bot = new Discord.Client();
const {prefix} = require('./config.json');

const TOKEN = process.env.BOT_TOKEN
bot.login(TOKEN);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
  if(command.aliases){
  command.aliases.forEach(
    alias => bot.aliases.set(alias, command.name)
  )
  }else{
    console.log(`Command ${command.name} has no aliases.` )
  }
}


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
  if(!msg.content.startsWith(prefix)||msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  if (bot.commands.has(commandName)){
    try {
      bot.commands.get(commandName).execute(msg, args);
    } catch (error) {
      console.error(error);
      bot.reply('there was an error trying to execute that command!');
    }
  }else if(bot.aliases.has(commandName)){
    try {
      bot.commands.get(bot.aliases.get(commandName)).execute(msg, args);
    } catch (error) {
      console.error(error);
      bot.reply('there was an error trying to execute that command!');
    }
  }else{
    return;
  }

  

});
