// Imports
// eslint-disable-next-line no-unused-vars
const RaBinDraClient = require("../Structures/Client");
const Discord = require("discord.js");
const { PREFIX: prefix, OWNER: owner } = process.env;
const { toMs } = require("../Util/Util");
const cooldowns = new Discord.Collection();

// Plugins
const AutoReactOnLol = require("../Plugins/Message/AutoReactOnLol");
const AutoReactOnMention = require("../Plugins/Message/AutoReactOnMention");
const AutoReactOnWTF = require("../Plugins/Message/AutoReactOnWTF");
const SendF = require("../Plugins/Message/SendF");
const CussWordFilter = require("../Plugins/Message/CussWordFilter");
const OwOCounter = require("../Plugins/Message/OwOCounter");
const SendOwO = require("../Plugins/Message/SendOwO");
const SendUwU = require("../Plugins/Message/SendUwU");


module.exports = {
	name: "message",
	/**
	 * @param {RaBinDraClient} client
	 * @param {Discord.Message} message
	 */
	async run(client, message) {
		// Returning if the Message Author is a Bot or Webhook
		if(message.author.bot || message.webhookID) return;

		// Pass stuff to the Plugins
		AutoReactOnMention(message);
		AutoReactOnWTF(message);
		SendF(message);
		AutoReactOnLol(message);
		CussWordFilter(message);
		await OwOCounter(message);
		SendOwO(message);
		SendUwU(message);

		// Command Loader
		if(!message.content.startsWith(prefix.toLowerCase())) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

		if(!command) return;

		// Filters
		if(command.ownerOnly && message.author.id !== owner) return message.channel.send(`To use this command you need to be as cool as **${client.users.cache.get(owner).tag}** which tbh you aren't`);

		if(command.guildOnly && !message.guild) return message.channel.send("I cannot execute this command in DMs!");

		if(command.dmOnly && message.guild) return message.channel.send("I cannot execute command in a guild! Please run this command in a DM to execute this command!");

		if(command.minArgs && typeof command.minArgs === "number" && !args[command.minArgs - 1]) {
			return message.channel.send("I need more arguments");
		}

		if(command.cPerms) {
			if(typeof command.cPerms === "string") command.cPerms = [command.cPerms];
			if(!Array.isArray(command.cPerms)) throw new Error("Client Permissions is not an Array");
			const permissions = message.channel.permissionsFor(message.guild.me);

			if(!permissions.has("SEND_MESSAGES")) return;

			if(!permissions.has("EMBED_LINKS") || !permissions.has("ADD_REACTIONS")) return message.channel.send(`${client.assets.emojis.error} I do not have Embed Link or Add Reactions Permissions in the server! Please give me those permissions to allow me to function.`);
			let bool;
			for(const perm of command.cPerms) {
				if(permissions.has(perm)) {
					message.channel.send(`${message.client.assets.emojis.error} You don't have the necessary permissions to use this command! You need ${perm} to execute this command`);
					bool = false;
					break;
				}
				bool = true;
			}

			if(!bool) return;
		}

		if(command.mPerms) {
			if(typeof command.mPerms === "string") command.mPerms = [command.mPerms];
			if(!Array.isArray(command.mPerms)) throw new Error("Client Permissions is not an Array");
			const permissions = message.channel.permissionsFor(message.author);

			let bool;
			for(const perm of command.mPerms) {
				if(permissions.has(perm)) {
					message.channel.send(`${message.client.assets.emojis.error} You don't have the necessary permissions to use this command! You need ${perm} to execute this command`);
					bool = false;
					break;
				}
				bool = true;
			}

			if(!bool) return;
		}

		// #Cooldowns Oh Yeah
		if(!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = toMs(command.cooldown || 3);

		if(timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if(now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;

				return message.channel.send(`${message.author}, Please wait for \`${timeLeft.toFixed(0)}\`seconds to use this command again.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		// Executing Code~
		try {
			command.run(message, args);
		}
		catch(err) {
			return message.channel.send(`Something broke while executing this command \n **Error:** ${err.message}`);
		}
	},
};