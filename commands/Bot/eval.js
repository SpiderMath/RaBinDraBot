module.exports = {
	name: "eval",
	description: "Evaluates Bot Code",
	ownerOnly: true,
	async run(message, args) {
		if(!args[0]) return message.channel.send("Being my owner you should be smart but you still aren't...");

		const code = args.join(" ").replace(/```js/g, "").replace(/```/g, "");

		const data = await eval(code);

		message.channel.send(`\`\`\`${data}\`\`\``);
	},
};