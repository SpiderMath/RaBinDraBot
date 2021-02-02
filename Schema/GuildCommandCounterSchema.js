const mongoose = require("mongoose");

const GuildCommandCounterSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	data: {
		type: Array,
		required: true,
	},
});

module.exports = GuildCommandCounterSchema;