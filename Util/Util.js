const { MAX_SAFE_INTEGER } = Number;
const Discord = require("discord.js");

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
}

module.exports = Util;