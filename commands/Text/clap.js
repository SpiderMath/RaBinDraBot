module.exports = {
	name: "clap",
	description: "Claps outs your text",
	aliases: [],
	minArgs: 1,
	usage: "<Your Text to Clap Out>",
	run(message, args) {
		let clapArr = (args[0] ? args.join(" ") : `${message.author.tag} didn't provide any text`).split("");

		let string = clapArr.join(" 👏 ");

		if(string.length > 2000) {
			clapArr = args.join(" ").split(/ +/g);

			string = clapArr.join(" 👏 ");
		}

		message.channel.send(string);
	},
};