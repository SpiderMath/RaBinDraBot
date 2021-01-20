const Akinator = require("../../Structures/Classes/Akinator");

module.exports = {
	name: "aki",
	aliases: ["akinator"],
	async run(message) {
		const Aki = new Akinator(message);
		await Aki.init();
	},
};