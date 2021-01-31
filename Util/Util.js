const { MAX_SAFE_INTEGER } = Number;
const { stripIndents } = require("common-tags");
const Discord = require("discord.js");
const { MONGOPASS: MongoPass, OWNER: ownerID } = process.env;
const mongoose = require("mongoose");
const { red } = require("../Assets/JSON/colours.json");

const yes = ["yes", "y", "ye", "yeah", "yup", "yea", "ya", "hai", "si", "sí", "oui", "はい", "correct"];
const no = ["no", "n", "nah", "nope", "nop", "iie", "いいえ", "non", "fuck off"];

class Util {
	static isSafeNumber(num) {
		if(isNaN(num)) return false;
		if(num === Infinity || num === -Infinity || num > MAX_SAFE_INTEGER || num < -MAX_SAFE_INTEGER) return false;
		return true;
	}

	static toMs(num) {
		return num * 1000;
	}

	/**
	 * @param {Discord.User} user
	 * @param {Discord.ColorResolvable} color
	 */
	static MessageEmbed(user, color) {
		return new Discord.MessageEmbed()
			.setColor(color)
			.setTimestamp()
			.setFooter(`Requested by ${user.tag}`, user.displayAvatarURL({ dynamic: true }));
	}

	static list(array, conjuction = "or") {
		const len = array.length;
		if (len === 0) return "";
		if (len === 1) return array[0];
		return `${array.slice(0, -1).join(", ")}${len > 1 ? `${len > 2 ? "," : ""} ${conjuction} ` : ""}${array.slice(-1)}`;
	}

	/**
	 * @param {String} text
	 * @param {Object} dict
	 * @param {String} join
	 */
	static wordTrans(text, dict, join = " ") {
		if (typeof text !== "string") throw new TypeError("text must be a string.");
		if (typeof dict !== "object") throw new TypeError("dictionary must be an object.");
		return text.split(" ").map(word => {
			const strip = word.replace(/[!@#$%^&*()`~=+[\]{};:",.<>?]/g, "").replace(/(?:s'|'s)$/, "");
			const lowerCase = strip.toLowerCase();
			if (!dict[lowerCase]) return word;
			let change = word.toLowerCase().replace(lowerCase, dict[lowerCase]);
			if (strip.charAt(0).toUpperCase() === strip.charAt(0)) {
				change = change.replace(dict[lowerCase].charAt(0), dict[lowerCase].charAt(0).toUpperCase());
			}
			if (strip.length > 1 && strip.toUpperCase() === strip) change = change.toUpperCase();
			return change;
		}).join(join);
	}

	/**
	 * @param {String} text
	 * @param {Object} dict
	 * @param {String} join
	 */
	static letterTrans(text, dict, join = "") {
		if (typeof text !== "string") throw new TypeError("Text must be a string");
		if (typeof dict !== "object") throw new TypeError("Dictionary must be an object");
		return text.split("").map(letter => dict[letter] || letter).join(join);
	}

	/**
	 * @param {Error} err
	 * @param {Discord.Message} message
	 */
	static errMsg(err, message) {
		return `${message.client.assets.emojis.error} Something went wrong while executing this command! Please try again later!\n **Error: ** ${err.message}`;
	}


	/**
	 * @param {String[]} arr
	 * @param {any} value
	 */
	static removeFromArray(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) return arr.splice(index, 1);
		return arr;
	}


	static async verify(channel, user, { time = 30000, extraYes = [], extraNo = [] } = {}) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return (user ? res.author.id === user.id : true)
				&& (yes.includes(value) || no.includes(value) || extraYes.includes(value) || extraNo.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time,
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice) || extraYes.includes(choice)) return true;
		if (no.includes(choice) || extraNo.includes(choice)) return false;
		return false;
	}

	/**
	 * @param {String} uri
	 */
	static mongoURI(uri) {
		return uri.replace(/<password>/g, MongoPass);
	}

	/**
	 * @param {String} uri
	 * @param {mongoose.Schema} schema
	 * @param {String} schemaName
	 */
	static async mongoModel(uri, schema, schemaName) {
		const connection = await mongoose.createConnection(uri.replace(/<password>/g, MongoPass), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const model = connection.model(schemaName, schema);

		return model;
	}

	/**
	 * @param {Error} err
	 * @param {Discord.Message} message
	 */
	static dmOwner(err, message) {
		const errorEmbed = new Discord.MessageEmbed()
			.setColor(red || "RED")
			.setTimestamp()
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle("New Error")
			.addField("Error Message", `\`\`\`js\n${err.message}\n\`\`\``);
			// .addField("Error Stack", `\`\`\`js\n${err.stack}\n\`\`\``);

		message.client.users.cache.get(ownerID).send({ split: true, embed: errorEmbed });
		message.client.users.cache.get(ownerID).send(stripIndents`
			**Stack: ** ${err.stack}
		`, { split: true });
	}

	/**
	 * @param {Discord.Message} message
	 */
	static async loadingMsg(message) {
		const msg = await message.channel.send(`${message.client.assets.emojis.loading} Processing your request...`);

		return msg;
	}

	/**
	 * @param {Number} miliseconds
	 */
	static parseMS(miliseconds) {

		if (typeof milliseconds !== "number") {
			throw new TypeError("Expected a number");
		}

		const roundTowardsZero = miliseconds > 0 ? Math.floor : Math.ceil;

		return {
			days: roundTowardsZero(miliseconds / 86400000),
			hours: roundTowardsZero(miliseconds / 3600000) % 24,
			minutes: roundTowardsZero(miliseconds / 60000) % 60,
			seconds: roundTowardsZero(miliseconds / 1000) % 60,
			milliseconds: roundTowardsZero(miliseconds) % 1000,
			microseconds: roundTowardsZero(miliseconds * 1000) % 1000,
			nanoseconds: roundTowardsZero(miliseconds * 1e6) % 1000,
		};
	}


	static formatBytes(bytes) {
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes == 0) return "0 Byte";
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
	}

	/**
	 * @param {Boolean} bool
	 */
	static checkOrCross(bool, message) {
		return bool ? message.client.assets.emojis.checkmark : message.client.assets.emojis.error;
	}

	/**
	 * @param {Discord.Message} message
	 * @param {String} text the Message you want the bot to send
	 */
	static async ReactVerify(message, text) {
		const msg = await message.channel.send(text);
		msg.react(message.client.assets.emojis.checkmark);
		msg.react(message.client.assets.emojis.error);

		const reacts = await msg.awaitReactions((reaction, user) => [
			message.client.emojis.cache.get(message.client.assets.emojis.error.split(/:/g)[2].slice(0, 18)).name,
			message.client.emojis.cache.get(message.client.assets.emojis.checkmark.split(/:/g)[2].slice(0, 18)).name,
		].includes(reaction.emoji.name) && user.id === message.author.id, { max: 1, time: 60000 });

		if(!reacts.size || reacts.first().emoji.name === message.client.emojis.cache.get(message.client.assets.emojis.error.split(/:/g)[2].slice(0, 18)).name) return false;
		return true;
	}
}

module.exports = Util;