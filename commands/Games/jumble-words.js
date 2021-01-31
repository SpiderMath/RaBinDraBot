const JumbleWords = require("../../Structures/Classes/JumbleWords");
const Jumble = new JumbleWords();
const { toMs } = require("../../Util/Util");

module.exports = {
	name: "jumble-words",
	description: "You need to provide the unjumbled word, you got one attempt and 60 seconds. Can you do it?",
	aliases: ["jumbled-words"],
	usage: " ",
	async run(message) {
		const word = Jumble.generate(1)[0];
		await message.channel.send(`${message.author}, unjumble the word: ${word.jumble}`);

		const msgs = await message.channel.awaitMessages(mesg => mesg.author.id === message.author.id && word.word.toLowerCase() === mesg.content.toLowerCase(), { max: 1, time: toMs(60) });

		if(!msgs.size) return message.channel.send(`${message.client.assets.emojis.error} Seems like you couldn't Decode... The answer was: **${word.word}**!`);

		message.channel.send(`${message.client.assets.emojis.checkmark} You got it right ${message.author}! It actually was ${word.word}, great job at this.`);
	},
};