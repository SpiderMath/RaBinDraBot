const { loadingMsg } = require("../../Util/Util");

module.exports = {
	name: "mocking-text",
	description: "Converts your text to MocKinG teXt",
	aliases: ["mockingtext"],
	minArgs: 1,
	usage: "<Text you want to convert>",
	async run(message, args) {
		const msg = await loadingMsg(message);

		const query = args.join(" ").split("");
		for(let i = 0; i < query.length; i++) {
			if(i % 3 === 0) query[i] = query[i].toUpperCase();
		}

		return message.channel.send(query).then(() => msg.delete());
	},
};