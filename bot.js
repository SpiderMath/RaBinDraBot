require("dotenv").config();
const { TOKEN: token } = process.env;
const RaBinDraClient = require("./Structures/Client.js");

const RaBinDraBot = new RaBinDraClient();

RaBinDraBot.login(token);