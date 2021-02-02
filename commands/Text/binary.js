const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "binary",
	description: "Encodes or Decodes your text to or from binary",
	aliases: ["bin"],
	minArgs: 2,
	usage: "<Encode | Decode> <Text you wanna convert>",
	run(message, args) {
		let resp;
		if(args[0].toLowerCase() === "encode") {
			args.shift();
			resp = Buffer.from(args.join(" ")).toString("binary");
		}
		else if(args[0].toLowerCase() === "decode") {
			args.shift();
			resp = Buffer.from(args.join(" "), "binary").toString("ascii");
		}
		else {
			return message.channel.send(`${message.client.assets.emojis.error} Invalid Input provided`);
		}

		const BinaryEmbed = MessageEmbed(message.author, green)
			.setTitle("Binary Encoder and Decoder")
			.setDescription(`\`\`\`\n${resp}\n\`\`\``);

		message.channel.send(BinaryEmbed);
	},
};