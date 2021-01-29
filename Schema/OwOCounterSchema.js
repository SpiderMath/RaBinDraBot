const mongoose = require("mongoose");

const OwOCounterSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	data: {
		type: Array,
		required: true,
	},
});

module.exports = OwOCounterSchema;