// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { MessageEmbed } = require("../../Util/Util");
const { green, yellow } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "ping",
	description: "",
	aliases: [],
	cPerms: ["EMBED_LINKS"],
	mPerms: [],
	cooldown: 2,
	/**
	 * @param {Message} message
	 */
	async run(message) {
		const pingingEmbed = MessageEmbed(message.author, yellow)
			.setTitle("Pinging")
			.setDescription("Please wait..");

		const msg = await message.channel.send(pingingEmbed);

		const pingEmbed = MessageEmbed(message.author, green)
			.setDescription("Nothin'");

		msg.edit(pingEmbed);
	},
};