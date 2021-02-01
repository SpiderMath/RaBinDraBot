const Discord = require("discord.js");
const fs = require("fs");
const AsciiTable = require("ascii-table");
const commandTable = new AsciiTable("Commands");
const chalk = require("chalk");
const path = require("path");
const moment = require("moment");

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
		this.commands = new Discord.Collection();
		this.aliases = new Discord.Collection();
		this.assets = {
			emojis: emojis,
		};
		this.games = {
			aki: new Discord.Collection(),
			minesweeper: new Discord.Collection(),
		};
		this.antiSpam = new Discord.Collection();

		const BGred = "\x1b[41m";
		const BGgreen = "\x1b[42m";
		const BGyellow = "\x1b[43m";
		const BGblue = "\x1b[44m";
		const reset = "\u001b[0m";
		const red = "\x1b[31m";
		const green = "\x1b[32m";
		const blue = "\x1b[34m";

		this.logger = {
			error: (name, data) => console.log(`${BGred}${moment()} --${red}${name}-- ${reset}${data}`),
			normal: (name, data) => console.log(`${BGblue}${moment()} --${blue}${name} -- ${reset}${data}`),
			success: (name, data) => console.log(`${BGgreen}${moment()} -- ${green}${name} -- ${reset}${data}`),
			warn: (name, data) => console.log(`${BGyellow}${moment()} -- ${yellow}${name} --${reset}${data}`),
		};
	}

	_loadCommands() {
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
		const eFiles = fs.readdirSync(path.join(__dirname, "..", "events")).filter(fName => fName.endsWith(".js"));
		for(const eFile of eFiles) {
			const ePull = require(`../events/${eFile}`);
			this.on(ePull.name, ePull.run.bind(null, this));
		}
	}
}

module.exports = RaBinDraClient;