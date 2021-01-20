const { default: Axios } = require("axios");
const { MessageEmbed } = require("../../Util/Util");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "mcserver",
	aliases: ["minecraft-server", "mc-server", "minecraftserver"],
	description: "Gets information about a Minecraft Server",
	cPerms: ["EMBED_LINKS"],
	minArgs: 1,
	usage: "<IP>",
	async run(message, args) {
		const ip = args[0];
		const { data } = await Axios.get(`https://api.mcsrvstat.us/2/${ip}`);

		const minecraftServerEmbed = MessageEmbed(message.author, green)
			.setTitle(`Information for ${data.hostname}`)
			.addField("IP", data.ip)
			.addField("Port", data.port)
			.addField("Players", [
				`**Online:** ${data.players.online}`,
				`**Max:** ${data.players.max}`,
			])
			.addField("Software", data.software);


		message.channel.send(minecraftServerEmbed);
	},
};