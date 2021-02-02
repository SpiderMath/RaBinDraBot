const { default: Axios } = require("axios");
const { loadingMsg, errMsg, MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "mdn",
	description: "",
	usage: "<Search Term>",
	minArgs: 1,
	async run(message, args) {
		const msg = await loadingMsg(message);
		try {
			const query = encodeURIComponent(args.join(" ").replace(/#/g, ".prototype."));

			const { data } = await Axios.get(`https://developer.mozilla.org/api/v1/search?q=${query}&locale=en-US&highlight=false`);

			if(!data.documents.length) return message.channel.send(`${message.client.assets.emojis.error} I couldn't find any results for that query!`);
			const Info = data.documents[0];

			const MDNEmbed = MessageEmbed(message.author, green)
				.setTitle("MDN Search")
				.setThumbnail("https://i.imgur.com/DFGXabG.png")
				.setDescription(`${Info.summary}...**Read More [Here](${Info.mdn_url})** `);


			return message.channel.send(MDNEmbed).then(() => msg.delete());
		}
		catch(err) {
			return message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};