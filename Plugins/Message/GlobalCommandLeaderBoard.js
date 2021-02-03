const { mongoModel, dmOwner } = require("../../Util/Util");
const CommandCounterSchema = require("../../Schema/CommandCounterSchema");
const { globalCommandLB } = require("../../Util/Client/mongodbUris.json");

module.exports = async function GlobalCommandLeaderBoard(message, command) {
	try {
		const connection = await mongoModel(globalCommandLB);

		try {
			const Data = connection.model("counter", CommandCounterSchema);

			Data.findOne({ _id: command.name }, (err, data) => {
				if(err) dmOwner(err, message);

				if(!data) {
					const newData = new Data({
						_id: command.name,
						count: 1,
					});

					newData.save().catch(err => dmOwner(err, message));
				}

				else {
					data.count += 1;

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