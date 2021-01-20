const bubbleText = require("../../Assets/JSON/bubble-text.json");
const { letterTrans, MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "bubble-text",
	description: "Converts your code to bubble text",
	aliases: ["bubbletext"],
	minArgs: 1,
	usage: "<your text to bubblify>",
	run(message, args) {
		const text = args.join(" ");
		if(text.length > 900) return message.channel.send(`${message.client.assets.emojis.error} You can't convert more than 900 characters`);

		const bubblified = letterTrans(text, bubbleText);

		const bubblifiedEmbed = MessageEmbed(message.author, green)
			.setTitle("Bubblified Text")
			.addField("📥Input📥", `\`\`\`\n${text}\n\`\`\``)
			.addField("📤Output📤", `\`\`\`\n${bubblified}\n\`\`\``);

		message.channel.send(bubblifiedEmbed);
	},
};