const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "txt",
	description: "Sends your text as a text file",
	minArgs: 1,
	usage: "<Text for txt>",
	aliases: ["txt-file"],
	cooldown: 10,
	cPerms: ["ATTACH_FILES"],
	run(message, args) {
		const text = args.join(" ");

		const TxtAttachment = new MessageAttachment(Buffer.from(text), `${message.author.username}.txt`);

		message.channel.send(TxtAttachment);
	},
};