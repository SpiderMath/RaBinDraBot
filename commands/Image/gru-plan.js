const { loadingMsg, errMsg, toMs } = require("../../Util/Util");
const { createCanvas, loadImage, registerFont } = require("canvas");
const { MessageAttachment } = require("discord.js");
const path = require("path");
const { wrapText } = require("../../Util/Canvas");
const coord = [[450, 129], [1200, 134], [450, 627], [1200, 627]];

registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-Regular.ttf"), { family: "Noto" });
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-CJK.otf"), { family: "Noto" });
registerFont(path.join(__dirname, "..", "..", "assets", "fonts", "Noto-Emoji.ttf"), { family: "Noto" });


module.exports = {
	name: "gru-plan",
	description: "Generates a Gru Plan Meme",
	aliases: ["gruplan"],
	usage: "<step 1> *<step2>* *<step3>*",
	minArgs: 1,
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const base = loadImage(path.join(__dirname, "../../Assets/Images/gru-plan.png"));
			const step1 = args.join(" ");
			if(step1.length > 150) return message.channel.send("Sorry but I can not accept more than 150 characters for this command!").then(() => msg.delete());

			const collector2 = await message.channel.awaitMessages(Fmsg => Fmsg.author.id === message.author.id && message.content.split("").length < 150, { max: 1, time: toMs(60) });
			if(!collector2.size) return message.channel.send(`${message.client.assets.emojis.error} You didn't respond, command cancelled. (All of the steps have to be less than 150 characters by the way)`);

			const collector3 = await message.channel.awaitMessages(Fmsg => Fmsg.author.id === message.author.id && Fmsg.content.split("").length < 150, { max: 1, time: toMs(60) });
			if(!collector3.size) return message.channel.send(`${message.client.assets.emojis.error} You didn't respond, command cancelled. (All of the steps have to be less than 150 characters by the way)`);

			const step2 = collector2.first().content || "??";
			const step3 = collector3.first().content || "??";

			const steps = [step1, step2, step3, step3];

			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(base, 0, 0);

			ctx.fillStyle = "black";
			ctx.textBaseline = "top";
			let i = 0;
			for (const [x, y] of coord) {
				ctx.font = "35px Noto";
				const step = steps[i];
				let fontSize = 35;
				while (ctx.measureText(step).width > 1100) {
					fontSize--;
					ctx.font = `${fontSize}px Noto`;
				}
				const lines = await wrapText(ctx, step, 252);
				ctx.fillText(lines.join("\n"), x, y);
				i++;
			}


			const GruPlanAttachment = new MessageAttachment(canvas.toBuffer(), "gru-plan.png");

			message.channel.send(GruPlanAttachment);
		}
		catch (err) {
			message.client.logger.error();
			return message.channel.send(errMsg(err, message));
		}
	},
};