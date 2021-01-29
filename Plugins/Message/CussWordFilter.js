const Discord = require("discord.js");
const { badWords } = require("../../Assets/JSON/bad-words.json");
const { errMsg } = require("../../Util/Util");
const { red } = require("../../Assets/JSON/colours.json");

/**
 *
 * @param {Discord.Message} message
 */
module.exports = function CussWordFilter(message) {
	if(!message.guild) return;
	const permissions = message.channel.permissionsFor(message.client.user);

	if(!permissions.has("MANAGE_MESSAGES")) return;

	const args = message.content.toLowerCase().split(/ +/g);

	let bool, word;

	args.forEach(trialWord => {
		const e = badWords.includes(trialWord);

		if(e) {
			bool = true;
			word = trialWord;
			return;
		}
	});

	if(!bool) return;

	const MessageDeleteEmbed = new Discord.MessageEmbed()
		.setFooter(`Anti Cuss System by ${message.client.user.tag}`, message.client.user.displayAvatarURL())
		.setColor(red || "RED")
		.setTitle("Message Deleted")
		.setDescription(`Your message has been deleted for the usage of the word **${word}**`);

	try {
		message.delete();
		message.author.send(MessageDeleteEmbed);
	}
	catch (err) {
		return message.channel.send(errMsg(err, message));
	}
};