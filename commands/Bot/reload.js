const fs = require("fs");
const path = require("path");

module.exports = {
	name: "reload",
	description: "Reloads a Command",
	minArgs: 1,
	ownerOnly: true,
	async run(message, args) {
		const { client } = message;
		const commandName = args[0].toLowerCase();
		const command = client.commands.get(commandName) || client.aliases.get(commandName);
		if(!command) return message.channel.send("I don't have a command Like that!");
		const msg = await message.channel.send(`${client.assets.emojis.loading} Deleting the Command...`);
		client.commands.delete(commandName);

		fs.readdirSync(path.join(__dirname, "../../commands/")).forEach(dir => {
			const files = fs.readdirSync(path.join(__dirname, `../../commands/${dir}/`));

			for(const file of files) {

				delete require.cache[require.resolve(`../../commands/${dir}/${file}`)];
				const pull = require(`../../commands/${dir}/${file}`);
				if(!pull.name) continue;

				const cmd = client.commands.get(pull.name.toLowerCase());

				if(!cmd) {
					pull.category = dir;
					client.commands.set(pull.name, pull);

					if(pull.aliases && Array.isArray(pull.aliases)) {
						for(const alias of pull.aliases) client.aliases.set(alias.toLowerCase(), pull.name.toLowerCase());
					}

					break;
				}
			}
		});

		msg.edit(`${client.assets.emojis.checkmark} Reloaded the command \`${args[0].toLowerCase()}\``);
	},
};