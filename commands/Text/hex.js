const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "hex",
	description: "Encodes or Decodes your text to or from Hex",
	minArgs: 2,
	usage: "<encode | decode> <Text you want to 'Hexify'>",
	run(message, args) {
		let resp;
		if(args[0].toLowerCase() === "encode") {
			args.shift();
			resp = Buffer.from(args.join(" ")).toString("hex");
		}
		else if(args[0].toLowerCase() === "decode") {
			args.shift();
			resp = Buffer.from(args.join(" "), "hex").toString("ascii");
		}
		else {
			return message.channel.send("Invalid input provided");
		}

		const HexEmbed = MessageEmbed(message.author, green)
			.setTitle("Hex Encoder & Decoder")
			.setDescription(`\`\`\`\n${resp}\n\`\`\``);

		message.channel.send(HexEmbed);
	},
};