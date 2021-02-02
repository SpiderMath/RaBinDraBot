module.exports = {
	name: "shuffle-text",
	description: "Shuffles your text",
	minArgs: 1,
	usage: "<Your Text>",
	aliases: ["shuffletext"],
	run(message, args) {
		const array = args.join(" ").split("");
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		message.channel.send(arr.join(" "));
	},
};