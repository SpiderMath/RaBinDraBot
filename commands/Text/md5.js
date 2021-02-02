const crypto = require("crypto");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "md5",
	description: "Encodes a Hash of the provided text using MD5 Algorithm",
	minArgs: 1,
	aliases: [],
	usage: "<Text you want to encode>",
	run(message, args) {
		const MD5Embed = MessageEmbed(message.author, green)
			.setTitle("MD5 Encoder")
			.setDescription(`\`\`\`\n${crypto.createHash("md5").update(args.join(" ")).digest("hex")}}\n\`\`\``);

		return message.channel.send(MD5Embed);
	},
};