const { loadingMsg, checkOrCross, MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "channelinfo",
	description: "Provides information about a Discord Channel",
	aliases: ["channeli", "cinfo"],
	usage: "[Channel Mention or ID]",
	async run(message, args) {
		const msg = await loadingMsg(message);
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

		const ChannelInfoEmbed = MessageEmbed(message.author, green)
			.setTitle("Channel Information")
			.addField("Created At", channel.createdAt, true)
			.addField("ID", channel.id, true)
			.addField("Name", channel.name)
			.addField("NSFW", checkOrCross(channel.nsfw))
			.addField("Slowmode", `${(channel.rateLimitPerUser / 1000)} Seconds`)
			.addField("Category", channel.parent ? channel.parent : message.client.assets.emojis.error)
			.addField("Description", channel.topic)
			.addField("Position", channel.position + 1);

		message.channel.send(ChannelInfoEmbed).then(() => msg.delete());
	},
};