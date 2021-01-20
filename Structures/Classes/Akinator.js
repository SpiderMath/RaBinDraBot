// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { MessageEmbed, toMs } = require("../../Util/Util");
const { Aki } = require("aki-api");
const region = "en";
const { yellow, green } = require("../../Assets/JSON/colours.json");
const { stripIndents } = require("common-tags");

class Akinator {
	/**
	 * @param {Message} message
	 */
	constructor(message) {
		this.message = message;
		this.player = message.author;
		this.aki = new Aki(region, !(message.channel.nsfw));
	}

	async init() {
		await this.aki.start();
		this.message.channel.send(`**${this.player.username}**, we're gonna start in a Minute, please send \`Y\` to confirm and \`N\` to cancel`);
		const confirmation = await this.message.channel.awaitMessages(msg => msg.author.id === this.message.author.id && (msg.content.toLowerCase() === "n" || msg.content.toLowerCase() === "n"), { max: 1, time: toMs(60) });
		if(!confirmation.size) return this.message.channel.send(`${this.message.client.assets.emojis.error} No response recieved, cancelled command.`);

		if(confirmation.first().toLowerCase() === "n") return this.message.channel.send(`${this.message.client.assets.emojis.checkmark} Cancelled the command successfully`);

		this.run();
	}

	async run() {
		const AkinatorEmbed = MessageEmbed(this.message.author, yellow)
			.setTitle("Akinator")
			.addField("Question", this.aki.question)
			.addField("Answers", stripIndents`
				1. ${this.aki.answers[0]}
				2. ${this.aki.answers[1]}
				3. ${this.aki.answers[2]}
				4. ${this.aki.answers[3]}
				5. ${this.aki.answers[4]}
				6. Previous
			`);

		this.message.channel.send(AkinatorEmbed);

		const filter = (res) => {
			return (res.author.id === this.message.author.id) && /^[1-6]$/i.test(res.content);
		};

		const responses = (await this.message.channel.awaitMessages(filter, { max: 1, time: toMs(60) }));
		if(!responses.size) return this.message.channel.send("I didn't get any response so I assume that I won..");

		if(responses.first().content === "5") await this.aki.back();

		else await this.aki.step(Number.parseInt(responses.first().content));

		if(this.aki.progress >= 70 || this.aki.currentStep >= 78) {
			this.i = 0;
			await this.aki.win();
			return this.win();
		}

		this.run();
	}

	async win() {
		const answer = this.aki.answers[this.i];
		if(!answer) return this.message.channel.send("I don't know...");

		const AnswerEmbed = MessageEmbed(this.message.author, "ORANGE")
			.setTitle(`Akinator Guess: ${this.i + 1}`)
			.addField(`Name: ${answer.name}`, `Description: ${answer.description}`)
			.setImage(answer.absolute_picture_path)
			.setDescription("Is this answer correct? (Respond with **Y/N**)");

		this.message.channel.send(AnswerEmbed);

		const responses = await this.message.channel.awaitMessages((res) => {
			return (res.author.id === this.message.author.id) && (/^[yn]/i.test(res.content.toLowerCase()));
		}, { max: 1, time: toMs(60) });

		if(responses.first().content.toLowerCase() === "n") {
			this.i++;
			this.win();
		}
		else {
			const WinEmbed = MessageEmbed(this.message.author, green)
				.setTitle("Akinator")
				.setDescription(`${this.message.client.assets.emojis.checkmark} I won again!`);
			this.message.channel.send(WinEmbed);
		}
	}
}

module.exports = Akinator;