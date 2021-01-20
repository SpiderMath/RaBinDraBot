module.exports = function AutoReactOnWTF(message) {
	if(message.content.toLowerCase() !== "wtf") return;

	const channelPermissions = message.channel.permissionsFor(message.client.user);
	if(!channelPermissions.has("ADD_REACTIONS")) return;

	message.react(message.client.assets.emojis.wtf);
};