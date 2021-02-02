const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "invite",
	description: "Gives you the bot invite",
	aliases: ["invitation"],
	async run(message) {
		const InvitationEmbed = MessageEmbed(message.author, green)
			.setTitle(`Invite ${message.client.user.username} to Your Server`)
			.setDescription(stripIndents`
				Here is the Invite [Link](${message.client.botInvite})
			`)
			.setThumbnail(message.client.user.displayAvatarURL({ dynamic: true }));

		message.channel.send(InvitationEmbed);
	},
};