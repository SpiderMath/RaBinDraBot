const { loadingMsg, errMsg, MessageEmbed } = require("../../Util/Util");
const { default: Axios } = require("axios");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "npmjs",
	description: "Search for an NPM Package and Get its Details",
	aliases: ["npm", "yarn", "yarnjs", "npm.js"],
	usage: "<Package Name>",
	minArgs: 1,
	async run(message, args) {
		const msg = await loadingMsg(message);
		try{
			const query = encodeURIComponent(args.join("-").toLowerCase());

			const res = await Axios.get(`https://registry.npmjs.com/${query}`);

			if(res.status !== 200) return message.channel.send(`${message.client.assets.emojis.error} Couldn't find such a Package`).then(() => msg.delete());

			const response = res.data;
			if(response.time.unpublished) return message.channel.send(`${message.client.assets.emojis.error} The requested package has been unpublished`);


			const NPMDataEmbed = MessageEmbed(message.author, green)
				.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1000px-Npm-logo.svg.png")
				.setTitle("NPM Search")
				.addField("❯ Package Name", response.name, true)
				.addField("❯ Description", response.description || "None Provided", true)
				.addField("❯ Latest Version", response["dist-tags"].latest, true)
				.addField("❯ Number of Versions", Object.keys(response.versions).length, true)
				.addField("❯ Maintainers", response.maintainers.map(val => val.name), true)
				.addField("❯ Keywords", response.keywords.join(", ") || "None Provided", true)
				.addField("❯ Repository", response.repository.url ? response.repository : "None", true)
				.addField("❯ Bugs", response.bugs ? response.bugs.url : "None", true)
				.addField("❯ License", response.license, true)
				.addField("❯ Homepage", response.homepage ? response.homepage : "None", true)
				.addField("❯ Last Updated", new Date(Object.keys(response.time)[Object.keys(response.time).length - 1]), true)
				.addField("❯ Dependencies", Object.keys(response.versions[response["dist-tags"].latest].dependencies).join(", "))
				.addField("❯ Main", response.versions[response["dist-tags"].latest].main)
				.addField("❯ Created On", new Date(response.time.created));


			message.channel.send(NPMDataEmbed)
				.then(() => msg.delete());
		}
		catch(err) {
			return message.channel.send(errMsg(err, message))
				.then(() => msg.delete());
		}
	},
};