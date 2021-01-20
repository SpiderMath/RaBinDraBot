const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "avatar",
	description: "Shows the avatar (aka profile picture) of a User",
	aliases: ["icon", "pfp"],
	run(message, args) {
		const user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

		const avatarEmbed = MessageEmbed(message.author, green)
			.setTitle(`Avatar of ${user.tag}`)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));

		message.channel.send(avatarEmbed);
	},
};