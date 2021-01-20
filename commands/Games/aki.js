const Akinator = require("../../Structures/Classes/Akinator");
const { toMs } = require("../../Util/Util");

module.exports = {
	name: "aki",
	aliases: ["akinator"],
	async run(message) {
		new Akinator(message)
			.setLanguage("en")
			.setTime(toMs(60 * 6))
			.on("start", (game) => console.log(game.message.author.tag))
			.on("end", (game) => console.log(game.message.author.tag))
			.run();
	},
};