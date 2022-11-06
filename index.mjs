import * as dotenv from "dotenv";
import discord from "discord.js";

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const {Client, GatewayIntentBits} = discord;

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
];

const client = new Client({intents});

const yesnoApiUrl = "https://yesno.wtf/api";

client.login(token);
client.once("ready", () => console.log(`Logged in as ${client.user.tag}`));
client.on("messageCreate", async (message) => {
    if (message.author.bot) {
        return;
    }

    if (!message.content.includes("MM:")) {
        return;
    }

    const question = message.content.split("MM:")[1].trim();

    console.log(`${message.author.username} asked "${question}"`);

    fetch(yesnoApiUrl)
        .then((response) => response.json())
        .then((response) => message.reply({
            content: response.answer,
            files: [response.image]
        }));
});