const { loadImage, createCanvas } = require("canvas");
const { loadingMsg, errMsg } = require("../../Util/Util");
const path = require("path");
const { centerImagePart } = require("../../Util/Canvas");
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "my-collection-grows",
	aliases: ["my-collection-grows-richer", "collection-grows"],
	description: "Send a 'My Collection Grows' Nekopara Meme ",
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

			const overlay = await loadImage(user.displayAvatarURL({ dynamic: false, format: "png", size: 512 }));
			const base = await loadImage(path.join(__dirname, "../../Assets/Images/my-collection-grows.png"));

			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext("2d");

			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.rotate(-14 * (Math.PI / 180));
			const { x, y, width, height } = centerImagePart(overlay, 425, 425, 145, 179);
			ctx.drawImage(overlay, x, y, width, height);
			ctx.rotate(14 * (Math.PI / 180));
			ctx.drawImage(base, 0, 0);

			const myCollectionGrowsAttachment = new MessageAttachment(canvas.toBuffer(), "my-collection-grows.png");
			message.channel.send(myCollectionGrowsAttachment).then(() => msg.delete());
		}
		catch (err) {
			message.client.logger.error(this.name, err.message);
			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};