const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");
const responses = require("../../Assets/JSON/8ball-responses.json");

module.exports = {
	name: "8-ball",
	description: "Ask a question to me child, I'll answer it",
	aliases: ["8ball"],
	cPerms: ["EMBED_LINKS"],
	usage: "<question>",
	minArgs: 1,
	async run(message, args) {
		const msg = await message.channel.send(`${message.client.assets.emojis.loading} Processing your request...`);
		const question = args.join(" ");

		const ballEmbed = MessageEmbed(message.author, green)
			.setTitle("Magical 8-ball")
			.addField("Question", question)
			.addField("Response", responses[Math.floor(Math.random() * responses.length)]);


		message.channel.send(ballEmbed).then(() => msg.delete());
	},
};