module.exports = {
	name: 'um',
	description: 'Unmutes all members in the origin voice channel',
	execute(msg, args) {
		if(!msg.member.voiceChannel){
            msg.channel.send('You must be in a voice channel to use this command!');
            return;
          };
          let channel = msg.member.voiceChannel;
            for (let member of channel.members) {
                member[1].setMute(false)
            }
          msg.channel.send(`Unmuted all members in ${channel}`)
	},
};