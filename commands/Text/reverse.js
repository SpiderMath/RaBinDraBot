module.exports = {
	name: "reverse",
	description: "Reverses your txet (example)",
	aliases: ["reverse-text"],
	minArgs: 1,
	usage: "<text you wanna reverse>",
	run(message, args) {
		message.channel.send(args.join(" ").split("").reverse().join(""));
	},
};