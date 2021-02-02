const { errMsg, loadingMsg } = require("../../Util/Util");
const { loadImage, createCanvas } = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "upside-down-img",
	aliases: ["upside-down-image", "up-down-img", "ipsidedownimage"],
	description: "Physically inverts a users avatar on both axes",
	usage: "[User Mention or ID]",
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;
			const base = await loadImage(user.displayAvatarURL({ dynamic: false, format: "png", size: 2048 }));

			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(base, base.wifth, base.height, 0, 0);

			const UpsideDownAttachment = new MessageAttachment(canvas.toBuffer(), "upside-down.png");

			message.channel.send(UpsideDownAttachment).then(() => msg.delete());
		}
		catch (err) {
			message.client.logger.error(this.name, err.message);
			message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};