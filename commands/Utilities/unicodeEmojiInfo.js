const EmojiParser = require("../../Structures/Classes/Emoji/EmojiParser");
const Parser = new EmojiParser();
const EmojiInfo = require("../../Structures/Classes/Emoji/EmojiInformation");
const { green } = require("../../Assets/JSON/colours.json");
const { errMsg, MessageEmbed } = require("../../Util/Util");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "unicodeEmojiInfo",
	aliases: ["uni-emoji-info", "uni-emoji"],
	description: "Shows the information for a unicode emoji",
	credits: [
		{
			name: "Emojipedia",
			reason: "Data",
			reasonURL: "https://emojipedia.org",
		},
	],
	async run(message, args) {
		try {
			const Emoji = Parser.parse(args.join(" "))[0].unicode;

			const raw = EmojiInfo.getHTML(Emoji);
			if(!raw) return message.channel.send("Invalid Emoji Provided");

			const data = EmojiInfo.fetchData(raw);

			const emojiEmbed = MessageEmbed(message.author, green)
				.setTitle("Unicode Emoji Information")
				.setDescription(stripIndents`
					**Emoji Name:** ${data.name}
					**Emoji Unicode:** ${data.unicode}
					**Emoji ShortCodes:** ${data.shortCodes.join(", ")}
					**Emoji Description:** ${data.description}
					**Emoji URLs for:** [Apple](${data.Apple}), [Docomo](${data.Docomo}), [Au By KDDI](${data.auByKDDI}), [WhatsApp](${data.WhatsApp}), [Facebook](${data.Facebook}), [Google](${data.Google}), [HTC](${data.HTC}), [JoyPixels](${data.JoyPixels}), [LG](${data.LG}), [Messenger](${data.Messenger}), [Microsoft](${data.Microsoft}), [Mozilla](${data.Mozilla}), [OpenMoji](${data.OpenMoji}), [Samsung](${data.Samsung}), [SoftBank](${data.SoftBank}), [Twitter](${data.Twitter})
				`);

			message.channel.send(emojiEmbed);
		}
		catch (err) {
			return message.channel.send(errMsg(err, message));
		}
	},
};