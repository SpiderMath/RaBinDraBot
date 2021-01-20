// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "firstMessage",
	description: "Fetches the First Message in the channel. (Might be very nostalgic for older members)",
	/**
	 * @param {Message} message
	 */
	async run(message, args) {
		const msg = await message.channel.send(`${message.client.assets.emojis.loading} Fetching messages, please wait..`);
		const channel = message.mentions.channels.first() || message.client.channels.cache.get(args[0]) || message.channel;
		if(channel.type !== "text" && channel.type !== "news") return message.channel.send("No messages can be sent there~");
		const messages = await channel.messages.fetch({ after: 1, limit: 1 });
		const firstMessage = messages.first() ? messages.first() : null;
		if(!firstMessage) return message.channel.send("I see that there have been no previous messages in this channel, soo the first Message is yours! Congrats!");

		const firstMessageEmbed = MessageEmbed(message.author, green)
			.setTitle(`First Message of ${channel}`)
			.addField("Jump to", `[Message](${firstMessage.url})`)
			.addField("Author of the Message was", firstMessage.author);

		if(firstMessage.content) {
			firstMessageEmbed.addField("Content", firstMessage.content);
		}

		message.channel.send(firstMessageEmbed)
			.then(() => msg.delete());
	},
};