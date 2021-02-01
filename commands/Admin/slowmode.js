const { loadingMsg, toMs } = require("../../Util/Util");

module.exports = {
	name: "slowmode",
	aliases: ["channel-ratelimit", "set-ratelimit-per-user"],
	description: "Sets the Slowmode (aka Ratelimit if you're a Discord Bot Coder) of a Text Channel",
	usage: "<Time In Seconds, only Number Please> [Text Channel Mention or ID]",
	cPerms: ["MANAGE_CHANNELS"],
	mPerms: ["MANAGE_CHANNELS"],
	minArgs: 1,
	async run(message, args) {
		const msg = await loadingMsg(message);
		const time = args[0];

		if(isNaN(time)) return message.channel.send("You didn't not provide a valid time").then(() => msg.delete());
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

		if(channel.type !== "text") return message.channel.send("Yeah as if I can set slowmode in a Voice Channel");

		channel.setRateLimitPerUser(toMs(time));

		message.react(message.client.assets.emojis.checkmark);
		message.channel.send(`${message.client.assets.emojis.checkmark} Successfully set the slowmode to ${time} seconds`);
	},
};