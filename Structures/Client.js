const Discord = require("discord.js");
const fs = require("fs");
const AsciiTable = require("ascii-table");
const commandTable = new AsciiTable("Commands");
const chalk = require("chalk");
const path = require("path");
const moment = require("moment");
const DisTube = require("distube");

const emojis = require("../Util/Client/emojis.json");

commandTable.setHeading("File");

class RaBinDraClient extends Discord.Client {
	constructor() {
		super({
			ws: {
				properties: {
					$browser: "Discord Android",
				},
				intents: Discord.Intents.ALL,
			},
			disableMentions: "everyone",
		});

		this._loadClient();
		this._loadCommands();
		this._loadEvents();
	}

	_loadClient() {
		// Command Handler Related
		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.categories = fs.readdirSync(path.join(__dirname, "../commands/"));

		// Assets
		this.assets = {
			emojis: emojis,
		};

		// Game Rooms
		this.games = {
			aki: new Discord.Collection(),
			minesweeper: new Discord.Collection(),
		};

		// Anti-Spam Gonna work on it
		this.antiSpam = new Discord.Collection();

		// Bot Invite for Invite Command
		this.botInvite = this.generateInvite({
			permissions: [
				"ADD_REACTIONS",
				"EMBED_LINKS",
				"SEND_MESSAGES",
				"CREATE_INSTANT_INVITE",
				"ATTACH_FILES",
				"MANAGE_CHANNELS",
				"ADMINISTRATOR",
			],
		});

		// Custom Logger
		const red = "\x1b[31m";
		const green = "\x1b[32m";
		const yellow = "\x1b[33m";
		const blue = "\x1b[34m";
		const reset = "\u001b[0m";

		this.logger = {
			success: (name, data) => console.log(`${green}${moment()} - ${name}: ${reset} ${data}`),
			error: (name, data) => console.log(`${red}${moment()} - ${name}: ${reset} ${data}`),
			info: (name, data) => console.log(`${blue}${moment()} - ${name}: ${reset} ${data}`),
			warn: (name, data) => console.log(`${yellow}${moment()} - ${name}: ${reset} ${data}`),
		};

		// Basic DisTube setup, gonna work on it later :P
		const disTube = new DisTube(this, { searchSongs: true, leaveOnEmpty: true });

		this.distube = disTube;
	}

	_loadCommands() {
		// Dynamically loading Commands
		fs.readdirSync(path.join(__dirname, "..", "commands")).forEach(dir => {
			const files = fs.readdirSync(path.join(__dirname, "..", "commands", dir)).filter(fName => fName.endsWith(".js"));

			for(const file of files) {
				const pull = require(`../commands/${dir}/${file}`);

				if(pull.name) {
					this.commands.set(pull.name.toLowerCase(), pull);
					commandTable.addRow(chalk.green(file));
				}
				else {
					commandTable.addRow(chalk.red(file));
					continue;
				}

				if(pull.aliases) {
					if(!Array.isArray(pull.aliases)) return console.log(chalk.yellow(`${file} -> Aliases not an Array!`));

					for(const alias of pull.aliases) {
						this.aliases.set(alias.toLowerCase(), pull.name.toLowerCase());
					}
				}
			}
		});
		console.log(commandTable.toString());
	}

	_loadEvents() {
		// Dynamically Loading Events Oof
		const eFiles = fs.readdirSync(path.join(__dirname, "..", "events")).filter(fName => fName.endsWith(".js"));
		for(const eFile of eFiles) {
			const ePull = require(`../events/${eFile}`);
			this.on(ePull.name, ePull.run.bind(null, this));
		}
	}
}

module.exports = RaBinDraClient;