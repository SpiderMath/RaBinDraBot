const { loadingMsg, errMsg } = require("../../Util/Util");

module.exports = {
	name: "join",
	description: "Joins a Voice channel",
	aliases: ["join-vc"],
	async run(message) {
		const msg = await loadingMsg(message);
		try {
			if(!message.member.voice.channel) return message.channel.send(`${message.client.assets.emojis.error} You are not even in a voice channel`).then(() => msg.delete());

			const vc = message.member.voice.channel;
			const vcPerms = vc.permissionsFor(message.client.user);
			if(!vcPerms.has("CONNECT") || !vcPerms.has("SPEAK")) return message.channel.send(`${message.client.assets.emojis.error} It seems like I don't have the permissions to connect to the channel or speak there`).then(() => msg.delete());

			if(message.client.voice.connections.get(message.guild.id)) return message.channel.send(`${message.client.assets.emojis.error} I am already in a Voice channel in the server...`).then(() => msg.delete());

			await vc.join();

			message.channel.send(`${message.client.assets.emojis.checkmark} Joined the voice channel successfully!`).then(() => msg.delete());
		}
		catch (err) {
			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};