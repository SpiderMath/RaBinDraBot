const { letterTrans, MessageEmbed } = require("../../Util/Util");
const tebahpla = require("../../Assets/JSON/tebahpla.json");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "tabahpla",
	description: "Encodes or Decodes tebahpla. Tebahpla is basically our normal alphabet but opposite",
	aliases: ["opposite-alphabet", "alphabet-reverse"],
	minArgs: 1,
	usage: "<encode | decode> <Your Text>",
	run(message, args) {
		let resp;
		if(args[0].toLowerCase() === "encode") {
			args.shift();
			resp = letterTrans(args.join(" ") || `${message.author.tag} forgot to provide the text`, tebahpla);
		}
		else if(args[0].toLowerCase() === "decode") {
			args.shift();
			resp = letterTrans(args.join(" ") || `${message.author.tag} forgot to provide the text`, tebahpla);
		}
		else {
			return message.channel.send("Invalid input provided");
		}

		const TebahPlaEmbed = MessageEmbed(message.author, green)
			.setTitle("Tebahpla Encoder and Decoder")
			.setDescription(`\`\`\`\n${resp}\n\`\`\``);

		message.channel.send(TebahPlaEmbed);
	},
};