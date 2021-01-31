const { loadingMsg, MessageEmbed } = require("../../Util/Util");
const Eval = require("math-expression-evaluator");
const { green } = require("../../Assets/JSON/colours.json");

module.exports = {
	name: "calculator",
	description: "Evaluates your Math Expressions",
	aliases: ["calc"],
	usage: "<Math Expression>",
	minArgs: 1,
	async run(message, args) {
		const msg = await loadingMsg(message);
		const expression = args.join(" ");
		let response;

		try {
			response = Eval.eval(expression);
		}
		catch(err) {
			return message.channel.send("Please enter a **Valid Problem**").then(() => msg.delete());
		}

		const CalculatorEmbed = MessageEmbed(message.author, green)
			.setTitle("Mathematics Calculator")
			.addField("📥 Input 📥", `\`\`\`css\n${expression}\n\`\`\``)
			.addField("📤 Output 📤", `\`\`\`css\n${response}\n\`\`\``);

		message.channel.send(CalculatorEmbed).then(() => msg.delete());
	},
};