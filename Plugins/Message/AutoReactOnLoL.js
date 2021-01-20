// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

/**
 * @param {Message} message
 */
module.exports = function AutoReactOnLol(message) {
	if(message.content.toLowerCase() !== "lol") return;

	const channelPermissions = message.channel.permissionsFor(message.client.user);

	if(!channelPermissions.has("ADD_REACTIONS")) return;

	message.react(message.client.assets.emojis.lol);
};