const result = [null, undefined, "\"\"", 0, "[]"];
const { loadingMsg, toMs } = require("../../Util/Util");

module.exports = {
	name: "quantum-coin",
	description: "Flips the Quantum Coin",
	aliases: ["quantum-coinflip"],
	usage: " ",
	async run(message) {
		const msg = await loadingMsg(message);

		const res = result[Math.floor(Math.random() * result.length)];

		setTimeout(() => {
			message.channel.send(`${message.client.assets.emojis.checkmark} Your coin landed on ${res}`)
				.then(() => msg.delete());
		}, toMs(10));
	},
};