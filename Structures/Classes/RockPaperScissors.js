// // eslint-disable-next-line no-unused-vars
// const { Message } = require("discord.js");
// const rps = [
// 	"rock",
// 	"paper",
// 	"scissors",
// ];
// const { green } = require("../../Assets/JSON/colours.json");
// const { MessageEmbed } = require("../../Util/Util");
// const RPSMap = {
// 	rock: "🪨",
// 	paper: "📰",
// 	scissors: "✂️",
// };

// class RockPaperScissors {
// 	/**
// 	 * @param {Message} message
// 	 * @param {String[]} args
// 	 */
// 	constructor(message, args) {
// 		this.message = message;
// 		this.challenged = message.mentions.users.first() || message.client.users.cache.get(args[0]);
// 		if(!this.challenged) return message.channel.send(`${message.author}, you didn't provide a valid user!`);
// 		this.challenger = this.message.author;
// 		this.run();
// 	}

// 	async run() {
// 		if(!this.challenged.bot) {
// 			const msg = await this.message.channel.send(`${this.challenged} do you accept the challenge? You got 1 minute to respond`);

// 			msg.react(this.message.client.assets.emojis.checkmark);
// 			msg.react(this.message.client.assets.emojis.error);

// 			const filter = (reaction, user) => {
// 				return ((user.id === this.challenged.id) && [
// 					this.message.client.emojis.cache.get(this.message.client.assets.emojis.checkmark.split(/:/g)[2].slice(0, 18)).name,
// 					this.message.client.emojis.cache.get(this.message.client.assets.emojis.error.split(/:/g)[2].slice(0, 18)).name,
// 				].includes(reaction.emoji.name)
// 				);
// 			};
// 			const reactions = await msg.awaitReactions(filter, { max: 1, time: 60000 });
// 			if(!reactions.size) return this.message.channel.send(`**${this.message.author.tag}**, looks like someone is scared to even respond...`);

// 			if(reactions.first().emoji.name === this.message.client.emojis.cache.get(this.message.client.assets.emojis.error.split(/:/g)[2].slice(0, 18)).name) {
// 				return this.message.channel.send(`**${this.message.author.tag}**, looks like someone is scared to play RPS with you~`);
// 			}

// 			try {
// 				const p1Msg = await this.challenger.send(`Which option do you pick? Your options are: ${rps.map(el => `\`${el}\``).join(", ")}`);
// 				const p2Msg = await this.challenged.send(`Which option do you pick? Your Options are: ${rps.map(el => `\`${el}\``).join(", ")}`);
// 				// const p1Stuff = await p1Msg.channel.awaitMessages(Pmsg => Pmsg.author.id === this.challenger.id && rps.includes(Pmsg.content.toLowerCase()), { max: 1, time: 60000 });
// 				// const p2Stuff = await p2Msg.channel.awaitMessages(PMsg => PMsg.author.id === this.challenged.id && rps.includes(PMsg.content.toLowerCase()), { max: 1, time: 60000 });

// 				// if(!p1Stuff.size) return this.message.channel.send(`**${this.challenged.tag}**, it seems like ${this.challenger} is scared of playing against you~`);
// 				// if(!p2Stuff.size) return this.message.channel.send(`**${this.challenger.tag}**, it seems like ${this.challenged} is scared of playing against you~`);

// 				// this.challenger.pick = p1Stuff.first().content.toLowerCase();
// 				// this.challenged.pick = p2Stuff.first().content.toLowerCase();

// 				// await p1Stuff.first().react(this.message.client.assets.emojis.checkmark);
// 				// await p2Stuff.first().react(this.message.client.assets.emojis.checkmark);

// 				const p1Collector = p1Msg.channel.createMessageCollector(PMsg => PMsg.author.id === this.challenger.id && rps.includes(PMsg.content.toLowerCase()), { time: 60000, max: 1 });
// 				const p2Collector = p2Msg.channel.createMessageCollector(PMsg => PMsg.author.id === this.challenger.id && rps.includes(PMsg.content.toLowerCase()), { time: 60000, max: 1 });

// 				p1Collector.on("end", (collected) => {
// 					if(!collected.first()) return this.message.channel.send(`**${this.challenged.tag}**, it seems like ${this.challenger} is scared of playing against you~`);

// 					this.challenger.pick = collected.first().content.toLowerCase();
// 				});

// 				p2Collector.on("end", (collected) => {
// 					if(!collected.first()) return this.message.channel.send(`**${this.challenger.tag}**, it seems like ${this.challenged} is scared of playing against you~`);

// 					this.challenged.pick = collected.first().content.toLowerCase();
// 				});
// 			}
// 			catch (err) {
// 				return this.message.channel.send("Can both of guys check if you have your DMs Open for me? Because I don't think you peeps do as I'm unable to send messages to you..." + err.message);
// 			}
// 		}
// 		else {
// 			this.challenged.pick = rps[Math.floor(Math.random() * rps.length)];
// 			try {
// 				const p1Msg = await this.challenger.send(`Which option do you pick? Your options are: ${rps.map(el => `\`${el}\``).join(", ")}`);
// 				const p1Stuff = await p1Msg.channel.awaitMessages(Pmsg => Pmsg.author.id === this.challenger.id && rps.includes(Pmsg.content.toLowerCase()), { max: 1, time: 60000 });
// 				if(!p1Stuff.size) return this.message.channel.send(`**${this.challenged.tag}**, it seems like ${this.challenger} is scared of playing against you~`);
// 				this.challenger.pick = p1Stuff.first().content.toLowerCase();
// 				await p1Stuff.first().react(this.message.client.assets.emojis.checkmark);
// 			}
// 			catch(err) {
// 				this.message.channel.send(`${this.challenger}, please open your DMs for me!`);
// 			}
// 		}
// 		const winCheck = this.rawCheck();

// 		const ResultEmbed = MessageEmbed(this.message.author, green)
// 			.addField(`${this.challenger.tag}`, RPSMap[this.challenger.pick], true)
// 			.addField(`${this.challenged.tag}`, RPSMap[this.challenged.pick], true)
// 			.addField("Result", winCheck ? `**Winner:** ${winCheck}` : "It was a Tie!")
// 			.setTitle("Rock Paper Scissors");

// 		const mesg = await this.message.channel.send(ResultEmbed);

// 		if(!this.challenged.bot) this.challenged.send(`Get the Result here: ${mesg.url}`);
// 		this.challenger.send(`Get the Result here: ${mesg.url}`);
// 	}


// 	rawCheck() {
// 		// Check Challenger = ROCK
// 		if (this.challenger.pick === "rock" && this.challenged.pick === "scissors") return this.challenger;
// 		else if (this.challenged.pick === "rock" && this.challenger.pick === "scissors") return this.challenged;
// 		else if (this.challenged.pick === "rock" && this.challenger.pick === "rock") return null;

// 		// Check Challenger = Paper
// 		if (this.challenger.pick === "paper" && this.challenged.pick === "rock") return this.challenger;
// 		else if (this.challenged.pick === "paper" && this.challenger.pick === "rock") return this.challenged;
// 		else if (this.challenged.pick === "paper" && this.challenger.pick === "paper") return null;

// 		// Check Challenger = Scissors
// 		if (this.challenger.pick === "scissors" && this.challenged.pick === "paper") return this.challenger;
// 		else if (this.challenged.pick === "scissors" && this.challenger.pick === "paper") return this.challenged;
// 		else if (this.challenged.pick === "scissors" && this.challenger.pick === "scissors") return null;
// 	}
// }

// module.exports = RockPaperScissors;