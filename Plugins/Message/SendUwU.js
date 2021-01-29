// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

/**
 * @param {Message} message
 */
module.exports = function SendUwU(message) {
	if(!message.guild) return;

	if(message.content.toLowerCase() !== "owo") return;

	const permissions = message.channel.permissionsFor(message.client.user);
	if(!permissions.has("SEND_MESSAGES")) return;

	message.channel.send("UwU");
};