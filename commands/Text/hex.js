module.exports = {
	name: "hex",
	description: "Encodes your text to Hex",
	minArgs: 1,
	usage: "<Text you want to 'Hexify'>",
	run(message, args) {
		return message.channel.send(Buffer.from(args.join(" ")).toString("hex"));
	},
};