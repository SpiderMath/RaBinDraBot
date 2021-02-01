module.exports = (message) => {
	if(message.content.toLowerCase() !== "what") return;

	if(!message.guild) return;
	const permissions = message.channel.permissionsFor(message.client.user);
	if(!permissions.has("ADD_REACTIONS")) return;

	message.react(message.client.assets.emojis.what);
};