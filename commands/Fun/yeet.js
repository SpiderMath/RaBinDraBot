const { stripIndents } = require("common-tags");
const { loadingMsg } = require("../../Util/Util");

module.exports = {
	name: "yeet",
	description:" Yeets your text while falling from the building",
	aliases: [],
	usage: "[Text to Yeet]",
	minArgs: 1,
	async run(message, args) {
		if(message.mentions.users.first()) return message.channel.send(`${message.author}, pings suck`);
		const msg = await loadingMsg(message);

		const yeetText = args.join(" ");

		message.channel.send(stripIndents`
			━━━━━┒
			┓┏┓┏┓┃
			┛┗┛┗┛┃ ＼${yeetText} ／
			┓┏┓┏┓┃     /
			┛┗┛┗┛┃ノ)
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┛┗┛┗┛┃
			┓┏┓┏┓┃
			┃┃┃┃┃┃
			┻┻┻┻┻┻     					${message.client.assets.emojis.salute}
		`)
			.then(() => msg.delete());
	},
};