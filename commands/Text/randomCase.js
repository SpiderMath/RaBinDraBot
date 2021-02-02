module.exports = {
	name: "randomcase",
	description: "Converts your text sunch that they have a random letter casing",
	aliases: ["random-case"],
	usage: "<Text you want to convert>",
	run(message, args) {
		const text = args[0] ? args.join(" ") : `${message.author.tag} forgot to provide any text`;
		return message.channel.send(text.map(char => {
			if(Math.random() > 0.5) return char.toLowerCase();
			else return char.toUpperCase();
		}));
	},
};