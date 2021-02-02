const morseEncode = require("../../Assets/JSON/morse-encode.json");
const morseDecode = require("../../Assets/JSON/morse-decode.json");
const { letterTrans, MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "morse",
	description: "Encodes or Decodes your Text to Morse",
	usage: "<encode | decode> <Text you want to convert>",
	aliases: ["morse-encode", "morse-decode"],
	minArgs: 1,
	run(message, args) {
		if(args[0].toLowerCase() === "encode") {
			args.shift();
			const resp = letterTrans(
				args[0]
					? args.join(" ")
					: `${message.author.username} forgot to add the text`,
				morseEncode,
			);

			const morseEncodeEmbed = MessageEmbed(message.author, green)
				.setTitle("Morse Encoder And Decoder")
				.setDescription(resp);

			message.channel.send(morseEncodeEmbed);
		}
		else if(args[0].toLowerCase() === "decode") {
			args.shift();
			const resp = letterTrans(
				args[0]
					? args.join(" ")
					: letterTrans(`${message.author.username} forgot to add the text`, morseEncode),
				morseDecode,
			);
			const morseDecodeEmbed = MessageEmbed(message.author, green)
				.setTitle("Morse Encoder and Decoder")
				.setDescription(resp);

			message.channel.send(morseDecodeEmbed);
		}
		else {
			return message.channel.send("Invalid input provided");
		}
	},
};