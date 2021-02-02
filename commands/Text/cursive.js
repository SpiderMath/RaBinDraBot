const { letterTrans } = require("../../Util/Util");
const dictionary = require("../../Assets/JSON/cursive.json");

module.exports = {
	name: "cursive",
	description: `Converts your text to ${letterTrans("Cursive text", dictionary)}`,
	aliases: ["cursive-text"],
	usage: "<Text you want to convert>",
	run(message, args) {
		const text = args[0] ? args.join(" ") : `${message.author.tag} doesn't know how to use this command`;

		return message.channel.send(letterTrans(text, dictionary));
	},
};