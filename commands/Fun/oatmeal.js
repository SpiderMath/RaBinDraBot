const { default: Axios } = require("axios");
const cheerio = require("cheerio");
const { MessageEmbed, errMsg } = require("../../Util/Util");


module.exports = {
	name: "oatmeal",
	aliases: ["oatmeal-comic"],
	description: "Gets a random Oatmeal comic for you",
	usage: " ",
	cooldown: 10,
	async run(message) {
		try {
			const { data: HTMLData } = await Axios.get("http://theoatmeal.com/feed/random");
			const $data = cheerio.load(HTMLData);
			const imgURL = `https:${$data("#comic").find("img").first().attr("src")}`;

			const cyanideEmbed = MessageEmbed(message.author, "GREEN")
				.setImage(imgURL)
				.setTitle("A Random Oatmeal Comic For You")
				.setDescription("**Credit and Source:** https://theoatmeal.com");

			message.channel.send(cyanideEmbed);
		}
		catch(err) {
			message.channel.send(errMsg(err, message));
		}
	},
};