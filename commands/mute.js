module.exports = {
	name: 'mute',
	description: 'Mutes all members in the origin voice channel',
	execute(msg, args) {
		if(!msg.member.voiceChannel){
            msg.channel.send('You must be in a voice channel to use this command!');
            return;
          };
          let channel = msg.member.voiceChannel;
            for (let member of channel.members) {
                member[1].setMute(true)
            }
          msg.channel.send(`Muted all members in ${channel}`)
	},
};