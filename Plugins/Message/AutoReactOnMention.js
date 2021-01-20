// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");

/**
 * @param {Message} message
 */
module.exports = function AutoReactOnMention(message) {
	if(!message.guild) return;
	if(!message.mentions.has(message.guild.me)) return;
	const permissions = message.channel.permissionsFor(message.client.user);
	if(!permissions.has("ADD_REACTIONS")) return;

	message.react("👀");
};