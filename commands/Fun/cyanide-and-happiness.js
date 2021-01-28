const { default: Axios } = require("axios");
const cheerio = require("cheerio");
const { MessageEmbed, errMsg } = require("../../Util/Util");


module.exports = {
	name: "cyanide-and-happiness",
	aliases: ["cyanide-happy", "cyanide-happiness"],
	description: "Gets a random Cyanide and Happiness comic for you",
	usage: " ",
	cooldown: 10,
	async run(message) {
		try {
			const { data: HTMLData } = await Axios.get("http://explosm.net/comics/random");
			const $data = cheerio.load(HTMLData);
			const imgURL = `https:${$data("#main-comic").attr("src")}`;

			const cyanideEmbed = MessageEmbed(message.author, "GREEN")
				.setImage(imgURL)
				.setTitle("A Random Cyanide and Happiness Comic For You")
				.setDescription("**Credit and Source:** https://explosm.net");

			message.channel.send(cyanideEmbed);
		}
		catch(err) {
			message.channel.send(errMsg(err, message));
		}
	},
};