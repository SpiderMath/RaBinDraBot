const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "base64",
	description: "Encodes or Decodes your input from to Text and Base64",
	aliases: ["base-64"],
	minArgs: 2,
	usage: "<encode | decode> <text>",
	async run(message, args) {
		if(!["encode", "decode"].includes(args[0].toLowerCase())) return message.channel.send(`${message.client.assets.emojis.error} You did not provide the option, whether you want to Encode or Decode`);

		args.shift();

		let resp;
		if(args[0].toLowerCase() === "encode") {
			resp = Buffer.from(args.join(" ")).toString("base64");
		}
		else {
			resp = Buffer.from(args.join(" "), "base64").toString("ascii");
		}

		const Base64Embed = MessageEmbed(message.author, green)
			.setTitle("Base-64 Encoder and Decoder")
			.setDescription(`\`\`\`\n${resp}\n\`\`\``);

		message.channel.send(Base64Embed);
	},
};