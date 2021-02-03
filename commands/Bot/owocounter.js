const { mongoModel, errMsg, MessageEmbed } = require("../../Util/Util");
const OwOCounterSchema = require("../../Schema/OwOCounterSchema");
const { owoCounter } = require("../../Util/Client/mongodbUris.json");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "owo-count",
	aliases: ["owocount", "owo-counter", "owocounter"],
	description: "Gets the number of OwOs and UwUs you've done",
	guildOnly: true,
	async run(message, args) {
		const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

		try {
			const connection = await mongoModel(owoCounter);

			try {
				const Data = connection.model("counter", OwOCounterSchema);
				Data.findOne({ _id: message.guild.id }, (err, data) => {
					if(err) return message.channel.send(errMsg(err));

					if(!data) return message.channel.send(`${message.client.assets.emojis.error} ${message.guild.name} isn't cool at all, no one has used any OwOs or UwUs yet!`);

					const userData = data.data.filter(d => d.user === user.id)[0];
					if(!userData) return message.channel.send(`${message.client.assets.emojis.error} ${user.username} have not used any OwOs or UwUs till now`);


					const dataEmbed = MessageEmbed(message.author, green)
						.setTitle(`${user.username}'s OwO Count`)
						.setDescription(`**OwO Count:** ${userData.count}`)
						.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }));

					message.channel.send(dataEmbed);
				});
			}
			finally {
				connection.close();
			}
		}
		catch(err) {
			message.channel.send(errMsg(err, message));
		}
	},
};