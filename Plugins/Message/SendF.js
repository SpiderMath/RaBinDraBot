module.exports = (message) => {
	if(message.content.toLowerCase() !== "f") return;

	const permissions = message.channel.permissionsFor(message.guild.me);
	if(!permissions.has("SEND_MESSAGES")) return;

	message.channel.send("f");
};