const { MessageAttachment } = require("discord.js");
const { loadingMsg, errMsg, toMs } = require("../../Util/Util");
const { loadImage, createCanvas, registerFont } = require("canvas");
const path = require("path");
const { shortenText } = require("../../Util/Canvas");

registerFont(path.join(__dirname, "..", "..", "Assets", "Fonts", "Noto-Regular.ttf"), { family: "Noto" });
registerFont(path.join(__dirname, "..", "..", "Assets", "Fonts", "Noto-CJK.otf"), { family: "Noto" });
registerFont(path.join(__dirname, "..", "..", "Assets", "Fonts", "Noto-Emoji.ttf"), { family: "Noto" });

module.exports = {
	name: "new-password",
	description: "Generates a new Password Meme for ya",
	aliases: ["new-pass"],
	usage: "*<Old Password>* *<New Password>*",
	async run(message) {
		const msg = await loadingMsg(message);
		try {
			await message.channel.send("What is going to be the old password?");
			const collector1 = await message.channel.awaitMessages(Fmsg => Fmsg.author.id === message.author.id && Fmsg.content.split("").length < 50, { max: 1, time: toMs(60) });
			if(!collector1.size) return message.channel.send(`${message.client.assets.emojis.error} You didn't respond, command cancelled. (All of the steps have to be less than 50 characters by the way)`).then(() => msg.delete());

			await message.channel.send("What is going to be the new password?");
			const collector2 = await message.channel.awaitMessages(Fmsg => Fmsg.author.id === message.author.id && Fmsg.content.split("").length < 50, { max: 1, time: toMs(60) });
			if(!collector2.size) return message.channel.send(`${message.client.assets.emojis.error} You didn't respond, command cancelled. (All of the steps have to be less than 50 characters by the way)`).then(() => msg.delete());

			const weak = collector1.first().content || `${message.author.tag}`;
			const strong = collector2.first().content || `${message.author.tag} is Dumb`;


			const base = await loadImage(path.join(__dirname, "../../Assets/Images/new-password.png"));

			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(base, 0, 0);

			ctx.font = "60px Noto";
			ctx.fillText(shortenText(ctx, weak, 780), 70, 191);
			ctx.fillText(shortenText(ctx, strong, 780), 70, 667);

			const NewPassAttachment = new MessageAttachment(canvas.toBuffer(), "new-password.png");

			message.channel.send(NewPassAttachment).then(() => msg.delete());
		}
		catch (err) {
			message.client.logger.error(this.name, err.message);
			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};