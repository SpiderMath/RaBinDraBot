// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { MessageEmbed } = require("../../Util/Util");
const { Aki } = require("aki-api");
const region = "en";

class Akinator {
	/**
	 * @param {Message} message
	 */
	constructor(message) {
		this.message = message;
		this.aki = new Aki(region, !(message.channel.nsfw));
	}

	
}

module.exports = Akinator;