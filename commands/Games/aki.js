const Akinator = require("../../Structures/Classes/Akinator");
const { toMs } = require("../../Util/Util");

module.exports = {
	name: "aki",
	cPerms: ["EMBED_LINKS"],
	aliases: ["akinator"],
	description: "Play Akinator with the bot in the channel!",
	guildOnly: true,
	async run(message) {
		new Akinator(message)
			.setLanguage("en")
			.setTime(toMs(60 * 6))
			.on("start", (game) => console.log(game.message.author.tag))
			.on("end", (game) => console.log(game.message.author.tag))
			.run();
	},
};