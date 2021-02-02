const { loadingMsg, errMsg } = require("../../Util/Util");
const Discord = require("discord.js");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
	name: "motion-blur",
	description: "Applies the Motion Blur effect on the Image",
	minArgs: 0,
	aliases: ["motion"],
	/**
	 * @param {Discord.Message} message
	 * @param {String[]} args
	 */
	async run(message, args) {
		const msg = await loadingMsg(message);

		try {
			const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;
			const imageBase = user.displayAvatarURL({ dynamic: false, format: "png", size: 4096 });
			const image = await loadImage(imageBase);
			const canvas = createCanvas(image.width, image.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(image, 0, 0);
			ctx.globalAlpha = 0.2;

			let i = 0;
			while(i < 5) {
				ctx.drawImage(image, i * 2, 0);
				i++;
			}

			ctx.globalAlpha = 1;

			if(Buffer.byteLength(canvas.toBuffer()) > 8e+6) return message.channel.send(`${message.client.assets.emojis.error} Size of the Image is too large for me to send... Sorry`);

			const motionAttachment = new Discord.MessageAttachment(canvas.toBuffer(), "motion-blur.png");
			message.channel.send(motionAttachment).then(() => msg.delete());
		}
		catch (err) {
			message.client.logger.error("motion-blur", err.message);
			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};