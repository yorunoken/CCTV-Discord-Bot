import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";

export class MyClient extends Client {
  slashCommands: Collection<any, any>;

  constructor(options: any) {
    super(options);
    this.slashCommands = new Collection();
  }
}

const client = new MyClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
});
const token = process.env.TOKEN as string;

// event handler
fs.readdirSync("./src/handlers").forEach(async (file: any) => {
  const commandFilePath = `./handlers/${file}`;
  const commandFileName = path.parse(commandFilePath).name;

  const event = await require(`./handlers/${commandFileName}`);

  client.on(event.name, (...args: any) => event.execute(...args, client));
});

// nodejs events
process.on("unhandledRejection", (e) => {
  console.error(e);
});
process.on("uncaughtException", (e) => {
  console.error(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.error(e);
});

client.login(token);
