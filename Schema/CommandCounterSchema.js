const mongoose = require("mongoose");

const CommandCounterSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
});

module.exports = CommandCounterSchema;