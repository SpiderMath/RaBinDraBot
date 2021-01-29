const { stripIndents } = require("common-tags");
const { mongoModel, errMsg, loadingMsg, MessageEmbed } = require("../../Util/Util");
const { owoCounter } = require("../../Util/Client/mongodbUris.json");
const OwOCounterSchema = require("../../Schema/OwOCounterSchema");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "owoleaderboard",
	aliases: ["owolb", "owo-lb", "owo-leaderboard"],
	description: "Get the leaderboard of the Server",
	cooldown: 10,
	async run(message) {
		const msg = await loadingMsg(message);
		try {
			const Data = await mongoModel(owoCounter, OwOCounterSchema, "counter");

			Data.findById({ _id: message.guild.id }, (err, data) => {
				if(err) return message.channel.send(errMsg(err, message)).then(() => msg.delete());

				if(!data) return message.channel.send(`${message.client.assets.emojis.error} Seems like this server has never used OwOs and UwUs...`).then(() => msg.delete());
				let sortedString = "";
				const sortedData = data.data.sort((a, b) => { return a.count - b.count; }).slice(0, 5);

				sortedData.forEach(object => {
					sortedString = stripIndents`
						**❯ Username:** ${message.client.users.cache.get(object.user).username}  **❯ Count:** ${object.count}
					`;
				});

				const LeaderBoardEmbed = MessageEmbed(message.author, green)
					.setTitle(`Top OwOers and UwUers in ${message.guild.name}`)
					.setDescription(sortedString);

				message.channel.send(LeaderBoardEmbed).then(() => msg.delete());
			});
		}
		catch(err) {
			message.channel.send(errMsg(err, message)).then(() => msg.delete());
		}
	},
};