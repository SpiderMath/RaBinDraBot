const { mongoModel, dmOwner } = require("../../Util/Util");
const GuildCommandCounterSchema = require("../../Schema/GuildCommandCounterSchema");
const { guildCommandLB } = require("../../Util/Client/mongodbUris.json");

module.exports = async function GuildCommandLeaderBoard(message, command) {
	if(!message.guild) return;
	try {
		const connection = await mongoModel(guildCommandLB);
		try {
			const Data = connection.model("counter", GuildCommandCounterSchema);

			Data.findOne({ _id: message.guild.id }, (err, data) => {
				if(err) dmOwner(err, message);

				if(!data) {
					const newData = new Data({
						_id: message.guild.id,
						data: [
							{
								name: command.name,
								count: 1,
							},
						],
					});

					newData.save().catch(err => dmOwner(err, message));
				}

				else {
					const cmd = data.data.filter(d => d.name === command.name)[0];

					if(!cmd) {
						data.data.push({
							name: command.name,
							count: 1,
						});
					}
					else {
						cmd.count += 1;
					}
					data.save().catch(err => dmOwner(err, message));
				}
			});
		}
		finally {
			connection.close();
		}
	}
	catch (err) {
		dmOwner(err, message);
	}
};