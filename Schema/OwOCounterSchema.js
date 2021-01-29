const mongoose = require("mongoose");

const OwOCounterSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
});

module.exports = OwOCounterSchema;