module.exports = {
	name: "coinflip",
	description: "Does a coinflip?",
	aliases: ["cointoss"],
	async run(message) {
		const msg = await message.channel.send(FlippingEmbed);
	}
};