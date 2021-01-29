// eslint-disable-next-line no-unused-vars
const { Message } = require("discord.js");
const { verify, removeFromArray, errMsg, toMs } = require("../../Util/Util");
const BombSweeper = require("bombsweeper.js");
const nums = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
const turnRegex = /^(flag )?(\d+), ?(\d+)/i;
const size = 10;
const { stripIndents } = require("common-tags");

module.exports = {
	name: "minesweeper",
	description: "Play MineSweeper",
	/**
	 * @param {Message} message
	 */
	async run(message) {
		const gameOnGoing = message.client.games.minesweeper.get(message.channel.id);
		if(gameOnGoing) return message.channel.send(`${message.client.assets.emojis.error} There is already a game going on in the channel! Please wait for it to end.`);

		try {
			message.client.games.minesweeper.set(message.channel.id, true);

			const game = new BombSweeper(size, size);
			game.PlaceBombs(size + 1);

			let win = null, cheatMode = false;
			const flagged = [];

			game.onWin = () => win = true;
			game.onLoss = () => win = false;

			while(win === null) {
				await message.channel.send(stripIndents`
					${message.author}, what coordinates do you pick (ex. 4,5)? Type \`end\` to forefeit.
					Type \`flag <coordinates>\` to flag a spot as a bomb. To remove a flag, run it again.
					${this.displayBoard(game.board, game.mask, flagged, cheatMode)}
					**Total Mines:** ${size + 1} | **Flagged:** ${flagged.length}
				`);

				const filter = res => {
					if (res.author.id !== message.author.id) return false;
					const pick = res.content;
					if (pick.toLowerCase() === "xyzzy" && !cheatMode) return true;
					if (pick.toLowerCase() === "end") return true;
					const coordPicked = pick.match(turnRegex);
					if (!coordPicked) return false;
					const x = Number.parseInt(coordPicked[2], 10);
					const y = Number.parseInt(coordPicked[3], 10);
					if (x > size || y > size || x < 1 || y < 1) return false;
					if (game.mask[y - 1][x - 1]) return false;
					return true;
				};

				const turn = await message.channel.awaitMessages(filter, { max: 1, time: toMs(120) });
				if(!turn.size) {
					message.channel.send(`${message.client.assets.emojis.error} You failed to respond in time!`);
					break;
				}

				const choice = turn.first().content.toLowerCase();

				if(choice === "end") {
					win = false;
					break;
				}
				if(choice === "xyzzy") {
					cheatMode = true;
					message.channel.send(`${message.client.assets.emojis.checkmark} Cheat mode has been enabled successfully`);
					continue;
				}

				const coordinatesPicked = choice.match(turnRegex);

				const x = Number.parseInt(coordinatesPicked[2], 10);
				const y = Number.parseInt(coordinatesPicked[3], 10);

				const flag = Boolean(coordinatesPicked[1]);

				if(flag) {
					if(flagged.includes(`${x - 1},${y - 1}`)) removeFromArray(flagged, `${x - 1},${y - 1}`);
					else flagged.push(`${x - 1},${y - 1}`);
				}
				else {
					if(flagged.includes(`${x - 1},${y - 1}`)) {
						await message.channel.send("Are you sure you want to check here? You've marked it as flagged previously..");
						const verification = await verify(message.channel, message.author);
						if(!verification) {
							await message.channel.send("Okay, I get it, you don't wanna do it, I understand...");
							continue;
						}
					}
					game.CheckCell(x - 1, y - 1);
					if(win === true || win === false) break;
				}
			}

			message.client.games.minesweeper.delete(message.channel.id);

			if(win === null) return message.channel.send(`Game has been cancelled due to inactivity of **${message.author.username}**`);

			return message.channel.send(stripIndents`
				${win ? `${message.client.assets.emojis.congrats} You won the Game!` : `${message.client.assets.emojis.error} You lost the game`}

				${this.displayBoard(game.board)}
			`);
		}
		catch (err) {
			message.channel.send(errMsg(err, message));
		}
	},

	displayBoard(board, mask, flagged, cheatMode = false) {
		let str = "";
		str += "⬛";
		str += nums.slice(0, board.length).join("");
		str += "\n";
		for (let i = 0; i < board.length; i++) {
			str += nums[i];
			board[i].forEach((item, j) => {
				if (cheatMode && item === "*") {
					str += "💣";
				}
				else if (!mask || mask[i][j]) {
					if (item === "*") {
						str += "💣";
					}
					else if (item === 0) {
						str += "⬜";
					}
					else {
						str += nums[item - 1];
					}
				}
				else if (flagged.includes(`${j},${i}`)) {
					str += "🚩";
				}
				else {
					str += "❓";
				}
			});
			str += "\n";
		}
		return str;
	},
};