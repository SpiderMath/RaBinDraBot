const Leet = require("../../Structures/Classes/Leet");

module.exports = {
	name: "leet",
	description: "Converts your Text to L33t Speak",
	aliases: ["l33t"],
	minArgs: 1,
	usage: "<Text you wanna convert to L33t>",
	async run(message, args) {
		const query = args.join(" ");
		if(query.split("").length > 500) return message.channel.send(`${message.client.assets.emojis.error} The maximum number of permissible characters is 500`);
		const leet = new Leet(query);

		return message.channel.send(leet.toLeet());
	},
};