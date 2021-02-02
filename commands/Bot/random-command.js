module.exports = {
	name: "random-command",
	aliases: ["random-cmd"],
	description: "Gives you a random command from my command collection",
	run(message) {
		message.react(message.client.assets.emojis.checkmark);
		return message.channel.send(`I would suggest you to try out \`${message.client.commands.random()}\` command`);
	},
};