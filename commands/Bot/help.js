module.exports = {
	name: "help",
	description: "Shows all the commands of the bot",
	aliases: ["halp"],
	async run(message, args) {
		if(!args[0]) {
			message.channel.send(message.client.commands.array().join(", "));
		}
	},
};