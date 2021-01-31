// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

/**
 * @param {Message} message
 */
module.exports = function AutoReactOnPog(message) {
	if(message.content.toLowerCase() !== "pog") return;
	const permissions = message.channel.permissionsFor(message.client.user);

	if(!permissions.has("ADD_REACTIONS")) return;

	message.react(message.client.assets.emojis.pog);
};