const { letterTrans } = require("../../Util/Util");
const dictionary = require("../../Assets/JSON/emojify.json");

module.exports = {
	name: "emojify",
	description: "'Emojifies' your text",
	aliases: ["emojyfy"],
	minArgs: 1,
	usage: "<text you want to emojify>",
	run(message, args) {
		const query = args.join(" ");

		const res = letterTrans(query, dictionary);

		if(res.length > 2000) return message.channel.send(`${message.client.assets.emojis.error} Text too long, please shorten it`);

		message.channel.send(res);
	},
};