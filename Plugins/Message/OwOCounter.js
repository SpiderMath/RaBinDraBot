// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { mongoModel, dmOwner } = require("../../Util/Util");
const { owoCounter } = require("../../Util/Client/mongodbUris.json");
const OwOCounterSchema = require("../../Schema/OwOCounterSchema");

const filter = (content) => content === "owo" || content === "uwu";
/**
 * @param {Message} message
 */
module.exports = async function OwOCounter(message) {
	const owo = filter(message.content.toLowerCase());

	if(!owo) return;


	try {
		const Data = await mongoModel(owoCounter, OwOCounterSchema, "counter");

		Data.findOne({ _id: message.guild.id }, (err, data) => {
			if(err) return dmOwner(err, message);

			if(!data) {
				const newData = new Data({
					_id: message.guild.id,
					data: [
						{ user: message.author.id, count: 1 },
					],
				});

				message.channel.send("**OwO Counter:** +1");
				newData
					.save()
					.catch(error => dmOwner(error, message));

			}
			else {
				const userCount = data.data.filter(d => d.user === message.author.id)[0];
				if(!userCount) userCount.user = message.author.id;
				userCount.count += 1;

				message.channel.send("**OwO Counter:** +1");

				data
					.save()
					.catch(error => dmOwner(error, message));
			}
		});
	}
	catch(err) {
		dmOwner(err, message);
	}
};