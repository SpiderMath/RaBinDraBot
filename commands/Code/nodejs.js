const { stripIndents } = require("common-tags");
const { find } = require("../../Structures/Classes/Node.js/nodejs");
const { loadingMsg, MessageEmbed, errMsg } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "nodejs",
	description: "Gets the information about a specific module in Node.js",
	credits: [
		{
			name: "Nodejs",
			url: "https://nodejs.org",
			reason: "Creator of Node.js",
		},
		{
			name: "GitHub",
			url: "https://github.com",
			reason: "API",
		},
	],
	minArgs: 1,
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const query = args[0].toLowerCase();

			const data = find(query, "15.x");

			if(!data) return message.channel.send(`${message.client.assets.emojis.error} There is nothing such as ${query}!`);

			const NodeJsMessageEmbed = MessageEmbed(message.author, green)
				.setTitle("NodeJS Module Information")
				.setDescription(stripIndents`
					**Module Name:** ${data.name}
					**Size:** ${data.size}
					**URK:** ${data.url}
					**GitHub:** ${data.github}
				`);

			message.channel.send(NodeJsMessageEmbed).then(() => msg.delete());
		}
		catch (err) {
			message.client.logger.error(this.name, err.message);
			message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};