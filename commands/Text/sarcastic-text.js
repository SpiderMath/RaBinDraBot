const { loadingMsg } = require("../../Util/Util");

module.exports = {
	name: "sarcastic-text",
	description: "Converts your text to sArCaStIc TeXt",
	aliases: ["sarcastictext"],
	minArgs: 1,
	usage: "<Text you wanna convert>",
	async run(message, args) {
		const msg = await loadingMsg(message);
		const query = args.join(" ").toLowerCase().split("");
		for(let i = 0; i < query.length; i++) {
			if(i % 2 === 0) query[i] = query[i].toUpperCase();
		}

		return message.channel.send(query.join("")).then(() => msg.delete());
	},
};