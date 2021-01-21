const { createCanvas, loadImage } = require("canvas");
// eslint-disable-next-line no-unused-vars
const { Message, MessageAttachment } = require("discord.js");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "wideuser",
	description: "",
	cPerms: ["ATTACH_FILES", "EMBED_LINKS"],
	/**
	 * @param {Message} message
	 * @param {String[]} args
	 */
	async run(message, args) {
		const msg = await message.channel.send(`${message.client.assets.emojis.loading} Processing your request..`);
		try {
			const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;
			const avatar = await loadImage(user.displayAvatarURL({ dynamic: false, format: "png", size: 512 }));

			const canvas = createCanvas(avatar.width * 3, avatar.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(avatar, 0, 0, avatar.width * 3, avatar.height);

			const attachment = new MessageAttachment(canvas.toBuffer(), "wide-user.png");

			const wideEmbed = MessageEmbed(message.author, green)
				.setTitle(`Wide Avatar for ${user.tag} 😉`)
				.attachFiles([attachment])
				.setImage("attachment://wide-user.png");

			message.channel.send(wideEmbed)
				.then(() => msg.delete());
		}
		catch(err) {
			message.channel.send(`Something went wrong. Please try again later! \n **Error: ** ${err.message}`)
				.then(() => msg.delete());
		}
	},
};