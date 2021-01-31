// const { ReactVerify, errMsg, delay } = require("../../Util/Util");
// const hearingTestData = require("../../Assets/JSON/hearing-test.json");
// const { stripIndents } = require("common-tags");
// const path = require("path");
// module.exports = {
// 	name: "hearing-test",
// 	description: "You gotta give a hearing test to get your age",
// 	aliases: ["hearingtest"],
// 	usage: " ",
// 	/**
// 	 * @param {client.Message} message
// 	 */
// 	async run(message) {
// 		const verification = await ReactVerify(message, "Are you sure you wanna take the test?");

// 		if(!verification) return message.channel.send("Okay, cancelled command");

// 		const connection = message.client.voice.connections.get(message.guild.id);
// 		if(!connection) return message.channel.send(`${message.client.assets.emojis.error} Please get me into a voice channel first!`);

// 		try {
// 			let age, range, previousAge = "all", previousRange = 8;

// 			for(const { age: dataAge, khz, file } of hearingTestData) {
// 				connection.play(path.join(__dirname, "..", "..", "Assets", "Sounds", "Hearing-Test", file));

// 				await delay(3500);

// 				const hearingVerification = await ReactVerify(message, "Were you able to hear what I just played?");

// 				if(!hearingVerification || hearingTestData[hearingTestData - 1].file === file) {
// 					age = previousAge;
// 					range = previousRange;

// 					break;
// 				}

// 				previousAge = dataAge;
// 				previousRange = khz;
// 			}

// 			if(age === "all") return message.channel.send("Well, it seems that either your internet connectivity is real bad or you are near deaf, since most of the people with normal hearning can hear that");
// 			if(age === "max") return message.channel.send(`WOAH Dude, seems like you finished my entire arsenal. Hoooo boy this is pretty awesome, since you have kind of a Superpower of hearing. The maximum you were able to hear was: ${range * 1000}Hz`);

// 			return message.channel.send(stripIndents`
// 				You have the hearing of human being of about the age of: ${Number.parseInt(age, 10)} since you were able to hear a sound of frequency: ${range * 1000}Hz
// 			`);
// 		}
// 		catch(err) {
// 			return message.channel.send(errMsg(err, message));
// 		}
// 	},
// };