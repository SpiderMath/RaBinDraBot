module.exports = {
	name: "unspoiler",
	description: "Unspoilers your text",
	aliases: ["unspoiler-text", "text-unspoiler"],
	minArgs: 1,
	usage: "<Text you want to unspoiler>",
	run(message, args) {
		const unspoileredText = args.join(" ").replace(/\|\|([^|]+)\|\|/g, "$1");

		if(!unspoileredText.trin()) return message.channel.send("** **");

		message.channel.send(unspoileredText);
	},
};