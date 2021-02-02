const { loadImage, createCanvas } = require("canvas");
const { loadingMsg, errMsg } = require("../../Util/Util");
const path = require("path");
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "kyon-gun",
	description: "Gets a user shot by Kyon",
	credits: [
		{
			name: "The Melancholy of Haruhi Suzumiya",
			url: "http://www.haruhi.tv/",
			reason: "Original Anime",
		},
		{
			name: "Know Your Meme",
			url: "https://knowyourmeme.com/",
			reason: "Image",
			reasonURL: "https://knowyourmeme.com/photos/217992-endless-eight-kyon-kun-denwa",
		},
	],
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;
			const kyon = await loadImage(path.join(__dirname, "../../Assets/Images/kyon-gun.png"));
			const userI = await loadImage(user.displayAvatarURL({ dynamic: false, format: "png", size: 512 }));

			const canvas = createCanvas(kyon.width, kyon.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(userI, 0, 0);
			ctx.drawImage(kyon, 0, 0);

			const kyonGunAttachment = new MessageAttachment(canvas.toBuffer(), "kyon-gun.png");

			message.channel.send(kyonGunAttachment);
		}
		catch(err) {
			message.client.logger.error(this.name, err.message);
			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};