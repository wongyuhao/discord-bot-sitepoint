module.exports = {
	name: 'ai',
	description: 'The gang is replaced by an AI.',
	execute(msg, args) {
         getRandomInt =(max) =>(
            Math.floor(Math.random() * Math.floor(max))
         )

        let person ='';
        if(!args.length){
            msg.channel.send('Choose a person first')
            return;
        }else{
            person=args.shift().toLowerCase();
        }
		const shitJeromeSays =[
            'Should I eat maggi tonight ah?',
            "Let's go bouldering!",
            'Cannot la I got work',
            'I got frisbee tomorrow so I can eat.',
            'Ok yuhao Ok.',
            'what are we eating for supper'
        ]

        switch(person){
            case 'jerome':{
                msg.channel.send(`Jerome: ${shitJeromeSays[getRandomInt(shitJeromeSays.length)]}`)
            }
        }

        
	},
};