const upsideDownEncode = require("../../Assets/JSON/upsideDown-encode.json");
const upsideDownDecode = require("../../Assets/JSON/upsideDown-decode.json");
const { letterTrans, MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "upside-down",
	description: `Converts your text to or from ${letterTrans("Upside Down", upsideDownEncode)}`,
	aliases: ["upside-down-text"],
	minArgs: 1,
	usage: "<encode | decode> <Your Text>",
	run(message, args) {
		let resp;
		if(args[0].toLowerCase() === "encode") {
			args.shift();
			resp = letterTrans(args.join(" ") || `${message.author.username} did not provide any input`, upsideDownEncode);
		}
		else if(args[0].toLowerCase() === "decode") {
			args.shift();
			resp = letterTrans(args.join(" ") || `${message.author.username} did not provide any input`, upsideDownDecode);
		}
		else {
			return message.channel.send("Invalid Input provided");
		}

		const upsideDownEmbed = MessageEmbed(message.author, green)
			.setTitle("Upside Down Characters Encoder and Decoder")
			.setDescription(`\`\`\`\n${resp}\n\`\`\``);

		message.channel.send(upsideDownEmbed);
	},
};