// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const { DISCORD_ALFRED_BOT_TOKEN } = process.env;

// Create a new instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

function declareBirth(client){
	client.guilds.cache.get("1039891023716950046").channels.cache.get("1039891023716950049").send("I'm alive! How may I be of assistance?");
};

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.ClientReady, (c) => {
	declareBirth(c);
});

// Log in to Discord with your client's token
client.login(DISCORD_ALFRED_BOT_TOKEN);

const prefix = "!"; // Prefix for commands

client.on(Events.MessageCreate, (message) => {
	const content = message.content.trim();
	if (!content.startsWith(prefix)) return; // Ignore messages that don't start with the prefix

	const args = content.slice(prefix.length).trim().split(/ +/); // Split the message into arguments
	const command = args.shift().toLowerCase(); // Get the command name

	const commands = {
		ping: () => {
			message.reply(
				`Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`
			);
		},
		help: () => {
			message.reply(`Available commands: ${Object.keys(commands).join(", ")}`);
		},
		rules: () => {
			message.reply(`There are no rules.`);
		}
	};

	if (command in commands) {
		commands[command]();
	}
});