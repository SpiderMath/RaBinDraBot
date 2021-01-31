const { ReactVerify } = require("../../Util/Util");

module.exports = {
	name: "togglensfw",
	description: "Toggles NSFW setting for the channel",
	aliases: ["toggle-nsfw"],
	mPerms: ["MANAGE_CHANNELS"],
	usage: "[Channel Mention or ID]",
	async run(message, args) {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		args.shift();

		if(channel.type !== "text") return message.channel.send(`${message.client.assets.emojis.error} You did not provide a Text Channel!`);
		const verification = await ReactVerify(message, `Are you sure you want to change ${channel} to ${channel.nsfw ? "Non-NSFW" : "NSFW"}?`);

		if(!verification) return message.channel.send(`${message.client.assets.emojis.checkmark} Cancelled the command successfully!`);

		if(channel.nsfw) {
			channel.setNSFW(false, args.join(" ") || `Moderator: ${message.author.tag} Time: ${new Date().toUTCString()}`);
		}
		else {
			channel.setNSFW(true, args.join(" ") || `Moderator: ${message.author.tag} Time: ${new Date().toUTCString()}`);
		}

		message.channel.send(`${message.client.assets.emojis.checkmark} Toggled NSFW Successfully!`);
	},
};