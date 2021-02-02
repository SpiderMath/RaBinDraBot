const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "spoiler-letter",
	description: `|| ${"Places every single letter as a spoiler".split("").join("||||")} ||`,
	aliases: ["spoilerletter"],
	usage: "<Text you want to 'Spoilerize'>",
	run(message, args) {
		const text = args[0] ? args.join(" ") : `${message.author.username} didn't provide the text`;
		const resp = `|| ${text.split().join("||||")} ||`;

		if(resp.length > 1900) return message.channel.send(`${message.client.assets.emojis.error} Output too long to process`);

		message.channel.send(
			MessageEmbed(message.author, green)
				.setTitle("Spoiler Text")
				.setDescription(resp),
		);
	},
};