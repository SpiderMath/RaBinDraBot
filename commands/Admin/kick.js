const { errMsg, toMs } = require("../../Util/Util");

module.exports = {
	name: "kick",
	description: "Kicks a Member from the server!",
	aliases: [],
	cPerms: ["KICK_MEMBERS", "MANAGE_MEMBERS"],
	mPerms: ["KICK_MEMBERS"],
	async run(message, args) {
		try {
			const targetUser = message.mentions.users.first() || message.client.users.cache.get(args[0]);
			args.shift();
			if(!targetUser) return message.channel.send(`${message.client.assets.emojis.error} You didn't provide a valid user to kick from the server!`);

			const msg = await message.channel.send(`Are you sure that you want to ban ${targetUser.tag}?`);

			msg.react(message.client.assets.emojis.checkmark);
			msg.react(message.client.assets.emojis.error);

			const reactions = await msg.awaitReactions((reaction, user) => [
				message.client.emojis.cache.get(message.client.assets.emojis.checkmark.split(/:/g)[2].slice(0, 18)).name,
				message.client.emojis.cache.get(message.client.assets.emojis.error.split(/:/g)[2].slice(0, 18)).name,
			].includes(reaction.emoji.name) && user.id === message.author.id, { max: 1, time: toMs(120) });

			if(!reactions.size) return message.channel.send(`${message.client.assets.emojis.error} Since you didn't respond, I assume you don't wanna ban that guy...`);
			if(
				reactions.first().emoji.name === message.client.emojis.cache.get(message.client.assets.emojis.error.split(/:/g)[2].slice(0, 18)).name
			) return message.channel.send(`${message.client.assets.emojis.checkmark} Cancelled the command successfully`);

			const target = message.guild.members.cache.get(targetUser.id);
			target
				.kick(args.join(" ") || `By ${message.author.tag} on ${new Date()}, Reason not specified`)
				.then(() => msg.delete())
				.then(() => message.channel.send(`${message.client.assets.emojis.checkmark} Successfully banned **${target.tag}** from the server`));
		}
		catch (err) {
			message.channel.send(errMsg(err, message));
		}
	},
};