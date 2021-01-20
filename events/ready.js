const chalk = require("chalk");
const statuses = require("../Util/Client/statuses.json");
const { toMs } = require("../Util/Util");
const { statusChangeInterval } = require("../Util/Client/config.json");

module.exports = {
	name: "ready",
	run(client) {
		console.log(chalk.green(`Logged in as ${client.user.tag} successfully!`));

		setInterval(() => {
			let num;
			client.guilds.cache.array().map(guild => num += guild.roles.cache.size);
			const status = statuses[Math.floor(Math.random() * statuses.length)];
			client.user.setActivity(
				status
					.text
					.replace(/{USERS}/g, client.users.cache.size)
					.replace(/{CHANNELS}/g, client.channels.cache.size)
					.replace(/{GUILDS}/g, client.guilds.cache.size)
					.replace(/{ROLES}/g, num)
					.replace(/{CMDS}/g, client.commands.size)
					.replace(/{EMOJIS}/g, client.emojis.cache.size)
					.replace(/{VCS}/g, client.voice.connections.size),
				{
					type: status.type,
				},
			);
		},
		toMs(statusChangeInterval),
		);

		client.voice.connections.array().forEach(connection => connection.channel.leave());
	},
};