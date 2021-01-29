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

		Data.findOne({ _id: message.author.id }, (err, data) => {
			if(err) return dmOwner(err, message);

			if(!data) {
				const newData = new Data({
					_id: message.author.id,
					count: 1,
				});

				message.channel.send("**OwO Counter:** +1");
				newData
					.save()
					.catch(error => dmOwner(error, message));

			}
			else {
				data.count += 1;

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