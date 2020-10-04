module.exports = {
  name: 'mute',
  aliases: ['m'],
	description: 'Mutes all members in the origin voice channel',
	execute(msg, args) {
		if(!msg.member.voiceChannel){
            msg.channel.send('You must be in a voice channel to use this command!');
            return;
    };
    
    let channel = msg.member.voiceChannel;
    let output =`Muted all members in ${channel}`
    for (let member of channel.members) {
        if(member.bot){
          output += ` except ${member}`
        }else{
          member[1].setMute(true)
        }
    }

     msg.channel.send(output)
	},
};