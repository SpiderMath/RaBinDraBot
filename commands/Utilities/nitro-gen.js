const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "nitro-generator",
	description: "Generates a Random Unchecked Discord Nitro Link for Ya",
	usage: " ",
	cooldown: 5,
	aliases: ["nitro-gen", "gen-nitro"],
	run(message) {
		let str = "";

		for(let i = 0; i < 16; i++) {
			str += pool[Math.floor(Math.random() * pool.length)];
		}

		const NitroGeneratedEmbed = MessageEmbed(message.author, green)
			.setTitle("Nitro Generator")
			.setDescription(stripIndents`
				An Unchecked Nitro Link has been generated! Click [here](https://discord.gift/${str}) to check it out!
			`)
			.setThumbnail("https://tenor.com/view/discord-nitro-upgrade-gif-wumpus-gif-13300784");

		message.channel.send(NitroGeneratedEmbed);
	},
};