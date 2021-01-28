const Akinator = require("../../Structures/Classes/Akinator");
const { toMs } = require("../../Util/Util");

module.exports = {
	name: "aki",
	cPerms: ["EMBED_LINKS"],
	aliases: ["akinator"],
	description: "Play Akinator with the bot in the channel!",
	guildOnly: true,
	async run(message) {
		const game = message.client.games.aki.get(message.channel.id);
		if(game) return message.channel.send(`${message.client.assets.emojis.error} There is already a game going on in this channel. Please wait for that game to be over!`);

		new Akinator(message)
			.setLanguage("en")
			.setTime(toMs(60 * 6))
			.on("start", () => message.client.games.aki.set(message.channel.id, true))
			.on("end", () => message.client.games.aki.delete(message.channel.id))
			.run();
	},
};