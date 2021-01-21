// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");
const Discord = require("discord.js");
const os = require("os");
const { stripIndents } = require("common-tags");
const { dependencies } = require("../../package.json");

module.exports = {
	name: "stats",
	description :"Shows the stats of the bot (and also its hosting)",
	cPerms: ["EMBED_LINKS"],
	aliases: [],
	/**
	 * @param {Message} message
	 */
	async run(message) {
		const { client } = message;
		const statsEmbed = MessageEmbed(message.author, green)
			.setTitle(`Statistics for ${client.user.tag}`)
			.addField("General", [
				`**❯ Users: ** ${client.users.cache.size}`,
				`**❯ Guilds: ** ${client.guilds.cache.size}`,
				`**❯ Playing Music in: ** ${client.voice.connections.size} guilds`,
				`**❯ Invite: ** [Click Here](${await client.generateInvite({
					permissions: ["ADMINISTRATOR"],
				})})`,
			])
			.addField("System Information", stripIndents`\`\`\`js
				"CPU Usage": ${process.cpuUsage().system + process.cpuUsage().user}
				"Memory Usage": ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
				"CPUs": ${os.cpus().length}
				"Platform": ${os.platform()}
				"Arch": ${os.arch()}
				"Hostname": ${os.hostname()}
				"Node Version": ${process.version}
				"Discord.js Version": ${Discord.version}
				"Dependencies": ${Object.keys(dependencies).map(dep => `\`${dep}\``).join(", ")}
				\`\`\``);

		message.channel.send(statsEmbed);
	},
};