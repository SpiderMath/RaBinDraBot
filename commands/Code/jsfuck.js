const { MessageEmbed } = require("../../Util/Util");
const jFuck = require("../../Structures/Classes/jsFuck");
const { green } = require("../../Assets/JSON/colours.json");
const { default: fetch } = require("node-fetch");

module.exports = {
	name: "jsfuck",
	description: "A simple command to show you the more esoteric parts of JavaScript.",
	aliases: ["jsf"],
	minArgs: 1,
	async run(message, args) {
		const code = args.join(" ").replace(/```/g, "");

		const jsFuck = jFuck.JSFuck.encode(code);
		const resp = await fetch("https://hastebin.com/documents", {
			method: "POST",
			body: jsFuck,
			headers: {
				"Content-Type": "text/javascript",
			},
		});
		const res = await resp.json();

		const jsFuckEmbed = MessageEmbed(message.author, green)
			.setTitle("Conversion Finished")
			.setDescription(`${message.client.assets.emojis.checkmark} Compiled your code to JavaScript. If your code is a Valid JS Code (which I hope it to be), then you should be able to execute it! Here is where you can find your code: [Click Here](https://hastebin.com/${res.key})`);

		message.channel.send(jsFuckEmbed);
	},
};