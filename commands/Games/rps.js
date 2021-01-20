const RockPaperScissors = require("../../Structures/Classes/RockPaperScissors");

module.exports = {
	name: "rps",
	description: "Play Rock-Paper-Scissors with your friends!",
	minArgs: 1,
	aliases: ["rock-paper-scissors"],
	guildOnly: true,
	run(message, args) {
		new RockPaperScissors(message, args);
	},
};