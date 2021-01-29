const { mongoModel, errMsg, MessageEmbed } = require("../../Util/Util");
const OwOCounterSchema = require("../../Schema/OwOCounterSchema");
const { owoCounter } = require("../../Util/Client/mongodbUris.json");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "owo-count",
	aliases: ["owocount", "owo-counter", "owocounter"],
	description: "Gets the number of OwOs and UwUs you've done",
	async run(message, args) {
		const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

		try {
			const Data = await mongoModel(owoCounter, OwOCounterSchema, "counter");

			Data.findOne({ _id: user.id }, (err, data) => {
				if(err) return message.channel.send(errMsg(err));

				if(!data) return message.channel.send(`${message.client.assets.emojis.error} ${user.username} have not used any OwOs or UwUs till now!`);

				const dataEmbed = MessageEmbed(message.author, green)
					.setTitle(`${user.username}'s OwO Count`)
					.setDescription(`**OwO Count:** ${data.count}`)
					.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }));

				message.channel.send(dataEmbed);
			});
		}
		catch(err) {
			message.channel.send(errMsg(err, message));
		}
	},
};