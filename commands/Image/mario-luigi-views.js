const { loadingMsg, errMsg, toMs } = require("../../Util/Util");
const { wrapText } = require("../../Util/Canvas");
const { loadImage, registerFont, createCanvas } = require("canvas");
const path = require("path");
const { MessageAttachment } = require("discord.js");

registerFont(path.join(__dirname, "../../Assets/Fonts/Noto-CJK.otf"), { family: "Noto" });
registerFont(path.join(__dirname, "../../Assets/Fonts/Noto-Regular.ttf"), { family: "Noto" });
registerFont(path.join(__dirname, "../../Assets/Fonts/Noto-Emoji.ttf"), { family: "Noto" });

module.exports = {
	name: "mario-luigi-views",
	aliases: ["mario-views", "luigi-views", "mario-luigi"],
	description: "Generates a Mario Luigi View Meme",
	minArgs: 1,
	usage: "<Topic> *<Mario Text>* *<Luigi Text>*",
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const topic = args.join(" ");

			await message.channel.send("What is gonna be Mario's view?");
			const marioViewCollector = await message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: toMs(60) });

			await message.channel.send("What is gonna be Luigi's View?");
			const luigiViewCollector = await message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: toMs(60) });

			const marioView = marioViewCollector.first() ? marioViewCollector.first().content : `${message.author.username} is Dumb`;
			const luigiView = luigiViewCollector.first() ? luigiViewCollector.first().content : "I gotta agree with you on this";

			const base = await loadImage(path.join(__dirname, "../../Assets/Images/mario-bros-views.png"));
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(base, 0, 0);

			ctx.textBaseline = "top";
			ctx.textAlign = "center";
			ctx.font = "47px Noto";

			ctx.fillText(topic, 420, 108, 180);
			ctx.fillStyle = "white";

			ctx.font = "36px Noto";

			let fontSize = 36;

			while (ctx.measureText(marioView).width > 800) {
				fontSize--;
				ctx.font = `${fontSize}px Noto`;
			}

			const marioLines = await wrapText(ctx, marioView, 200);
			const marioTopMost = 450 - (((fontSize * marioLines.length) / 2) + ((20 * (marioLines.length - 1)) / 2));

			for (let i = 0; i < marioLines.length; i++) {
				ctx.strokeStyle = "black";
				ctx.lineWidth = 5;

				const height = marioTopMost + ((fontSize + 20) * i);

				ctx.strokeText(marioLines[i], 205, height);
				ctx.fillText(marioLines[i], 205, height);
			}

			ctx.font = "36px Noto";
			fontSize = 36;

			while (ctx.measureText(luigiView).width > 800) {
				fontSize--;
				ctx.font = `${fontSize}px Noto`;
			}

			const luigiLines = await wrapText(ctx, luigiView, 200);
			const luigiTopMost = 450 - (((fontSize * luigiLines.length) / 2) + ((20 * (luigiLines.length - 1)) / 2));

			for (let i = 0; i < luigiLines.length; i++) {
				ctx.strokeStyle = "black";
				ctx.lineWidth = 5;

				const height = luigiTopMost + ((fontSize + 20) * i);

				ctx.strokeText(luigiLines[i], 450, height);
				ctx.fillText(luigiLines[i], 450, height);
			}

			const MarioLuigiViews = new MessageAttachment(canvas.toBuffer(), "mario-luigi.png");

			message.channel.send(MarioLuigiViews).then(() => msg.delete());
		}
		catch(err) {
			console.log(err.stack);

			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};