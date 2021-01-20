// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { default: Axios } = require("axios");
const months = require("../../Assets/JSON/months.json");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "xkcd-current",
	description: "Gets the Latest XKCD comic",
	cooldown: 10,
	aliases: ["current-xkcd"],
	/**
	 * @param {Message} message
	 */
	async run(message) {
		const msg = await message.channel.send(`${message.client.assets.emojis.loading} Processing your request...`);
		try {
			const { data } = await Axios.get("https://xkcd.com/info.0.json");

			const month = months[data.month - 1];

			const xkcdEmbed = MessageEmbed(message.author, green)
				.setTitle("Current XKCD")
				.setImage(data.img)
				.setDescription(`**Date Published:** ${month} ${data.year}`);

			message.channel.send(xkcdEmbed)
				.then(() => msg.delete());
		}
		catch (err) {
			return message.channel.send(`Something went wrong while executing this command!\n **Error: ** ${err.message}`)
				.then(() => msg.delete());
		}
	},
};