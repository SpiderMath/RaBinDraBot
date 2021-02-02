// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { errMsg, loadingMsg, MessageEmbed, formatBytes } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");
const os = require("os");
const arrowLetter = "❯";
const { stripIndents } = require("common-tags");
const { dependencies } = require("../../package.json");
const { OWNER: ownerID } = process.env;

module.exports = {
	name: "stats",
	description: "Shows the statistics of the hosting of the Discord Bot",
	aliases: ["hosting"],
	usage: " ",
	/**
	 * @param {Message} message
	 */
	async run(message) {
		try {
			const msg = await loadingMsg(message);

			// Loading Data
			let avgClockMHz = 0;
			os.cpus().forEach(cpu => avgClockMHz += cpu.speed);

			const cpuName = os.cpus()[0].model;
			const cpuCores = os.cpus().length;

			const osType = os.type();
			const osVersion = os.version();
			const osArch = os.arch();
			const osPlatform = os.platform();
			const osBuild = os.release();

			const nodeVersion = process.version;

			const memUsage = formatBytes(process.memoryUsage().heapUsed);
			const memTotal = formatBytes(os.totalmem());

			// Sending Message and stuff
			const StatisticsEmbed = MessageEmbed(message.author, green)
				.setTitle("Statistics of Hosting")
				.addField(`${arrowLetter} Memory`, stripIndents`
				**Total Memory:** ${memTotal}
				**Memory Usage:** ${memUsage}
				**Percentage Of Memory Used:** ${(process.memoryUsage().heapUsed / os.totalmem()).toFixed(4)}
			`)
				.addField(`${arrowLetter} OS`, stripIndents`
				**OS Name:** ${osVersion}
				**OS Platform:** ${osPlatform}
				**OS Arch:** ${osArch}
				**OS Build:** ${osBuild}
				**OS Type:** ${osType}
			`)
				.addField(`${arrowLetter} CPU`, stripIndents`
				**CPU Model:** ${cpuName}
				**CPU Core Count:** ${cpuCores}
				**CPU Clock Speed:** ${avgClockMHz}
			`)
				.addField(`${arrowLetter} Code Information`, stripIndents`
				**Node Version:** ${nodeVersion}
				**Dependencies:** ${Object.keys(dependencies).join(", ")}
				**Owner:** ${message.client.users.cache.get(ownerID).tag}
			`);

			message.channel.send(StatisticsEmbed)
				.then(() => msg.delete());
		}
		catch(err) {
			message.client.logger.error("stats", err.message);
			return message.channel.send(errMsg(err, message));
		}
	},
};