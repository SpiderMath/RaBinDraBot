const { MessageEmbed, loadingMsg, errMsg } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");
const { default: Axios } = require("axios");

module.exports = {
	name: "discord.js",
	description: "Searches Discord.js Documentation for you",
	aliases: ["djs", "discordjs"],
	usage: "<Your Query>",
	async run(message, args) {
		if(!args[0]) {
			const noArgsEmbed = MessageEmbed(message.author, green)
				.setTitle("Discord.js Search")
				.setDescription("Since you did not provide any args, I assume you want to go to the main website itself? Click [here](https://discord.js.org) to visit the Documentation")
				.setImage("https://i.imgur.com/wSTFkRM.png");

			return message.channel.send(noArgsEmbed);
		}

		const msg = await loadingMsg(message);

		try {
			const { data } = await Axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(" "))}`);

			const DJSEmbed = MessageEmbed(message.author, green)
				.setImage("https://i.imgur.com/wSTFkRM.png")
				.setTitle("Discord.js Search")
				.setDescription(data.description);

			message.channel.send(DJSEmbed)
				.then(() => msg.delete());
		}
		catch (err) {
			message.channel.send(errMsg(err, message))
				.then(() => msg.delete());
		}
	},
};