const {
	Aki,
} = require("aki-api");
const {
	EventEmitter,
} = require("events");
const { orange, yellow, green } = require("../../Assets/JSON/colours.json");
const reactions = ["👍", "👎", "❔", "🤔", "🙄", "❌"];

class AkiGame {
	/**
	 * AkiGame constructor
	 * @param  {Discord.Message} message
	 * @param  {Object} options Aki options
	 *
	 */
	constructor(message, options = {}) {

		if (!message) throw new Error("Message is required option.");

		/**
		 * Emitter
		 * @type {EventEmitter}
		 */
		this.event = new EventEmitter();

		/**
		 * message
		 * @type {Discord.Message}
		 */
		this.message = message;

		/**
		 * Array of emojis
		 * @type {Array}
		 */
		this.reactions = reactions;

		/**
		 * Aki options
		 * @type {Object}
		 */
		this.options = options;

		/**
		 * Game language
		 * @type {string}
		 */
		this.language = options.language || "en";


		/**
		 * [aki description]
		 * @type {Aki|null}
		 */
		this.aki = null;

		/**
		 * game message
		 * @type {Discord.Message|null}
		 */
		this.embed = null;
		/**
		 * [win description]
		 * @type {boolean|null}
		 */
		this.win = null;
	}
	/**
	 *
	 * @param  {string}   event
	 * @param  {Function} callback
	 * @return {AkiGame}
	 */
	on(event, callback) {
		this.event.on(event, callback);
		return this;
	}
	/**
	 * Reset the game
	 * @return {boolean}
	 */
	reset() {
		this.win = null;
		this.aki = null;
		this.embed = null;
		return true;
	}
	/**
	 * React on a embed message
	 * @return {Promise<boolean>}
	 */
	async react() {
		for (const emoji of this.reactions) await this.embed.react(emoji);
		return true;
	}
	/**
	 * Start the game!
	 * @return {Promise<AkiGame>}
	 */
	async run() {
		this.reset();
		this.event.emit("start", this);

		this.aki = new Aki(this.language);

		await this.aki.start();

		const {
			question,
			answers,
			currentStep,
		} = this.aki;

		this.message.channel.send({
			embed: {
				title: `${this.message.author.username}, Question ${currentStep + 1}`,
				color: yellow,
				description: `**${question}**\n${answers.map((x, i) => `${x} | ${this.reactions[i]}`).join("\n")}`,
			},
		}).then(msg => {
			this.embed = msg;
			this.react();
			this.waitForReaction();
		});
		return this;
	}
	/**
	 * Ends the game!
	 * @return {undefined}
	 */
	end() {

		const {
			answers,
		} = this.aki;

		this.embed.edit({
			embed: {
				title: "Is this your character?",
				color: orange,
				image: {
					url: answers[0].absolute_picture_path,
				},
				description: `**${answers[0].name}**\n${answers[0].description}\nRanking as **#${answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`,
			},
		});

		const filter = m => m.author.id === this.message.author.id && /(yes|y|no|n)/i.test(m.content);

		this.message.channel.awaitMessages(filter, {
			time: 30000,
			max: 1,
			errors: ["time"],
		}).then(collected => {
			const content = collected.first().content;
			this.win = /(yes|y)/i.test(content) ? true : false;
			this.event.emit("end", this);
			this.embed.edit({
				embed: {
					title: this.win ? "Great! Guessed right one more time." : "Uh. you are win",
					color: green,
					description: "I love playing with you!",
				},
			});
		}).catch(() => {
			this.event.emit("end", this);
		});

	}
	/**
	 * Start the game collector.
	 * @return {undefined}
	 */
	waitForReaction() {
		const filter = (reaction, user) => user.id === this.message.author.id && this.reactions.includes(reaction.emoji.name);
		const collector = this.embed.createReactionCollector(filter, {
			time: typeof this.options.time === "number" ? this.options.time : 60000 * 6,
		});
		collector.on("collect", async (reaction, user) => {
			reaction.users.remove(user).catch(() => null);

			if (reaction.emoji.name === "❌") {
				collector.stop();
				this.win = false;
				this.embed.delete();
				this.event.emit("end", this);
				return;
			}

			await this.aki.step(this.reactions.indexOf(reaction.emoji.name));

			const {
				question,
				answers,
				currentStep,
				progress,
			} = this.aki;

			if (progress >= 70 || currentStep >= 78) {
				this.embed.reactions.removeAll().catch(() => null);
				await this.aki.win();
				collector.stop();
				this.end();
			}
			else {
				this.embed.edit({
					embed: {
						title: `${this.message.author.username}, Question ${currentStep + 1}`,
						description: `**${question}**\n${answers.map((x, i) => `${x} | ${this.reactions[i]}`).join("\n")}`,
						color: yellow,
					},
				});
			}
		});
	}
	/**
	 * Set game language.
	 * @param {string} available language at: https://github.com/jgoralcz/aki-api/blob/develop/src/lib/constants/Client.js#L4
	 * @return {AkiGame}
	 */
	setLanguage(language) {
		this.language = language;
		return this;
	}
	/**
	 * Set rection colllector time.
	 * @param {number} time (in milliseconds)
	 * @return {AkiGame}
	 */
	setTime(time) {
		this.options.time = time;
		return this;
	}
}

module.exports = AkiGame;