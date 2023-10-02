import { MyClient } from "..";
import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
// import { query } from "../utils/getQuery";
const token = process.env.TOKEN as string;

const rest = new REST({ version: "10" }).setToken(token);

export const name = "ready";
export const execute = async (_: any, client: MyClient) => {
  if (!client.user) return;
  // await query({ query: "CREATE TABLE IF NOT EXISTS servers (id TEXT PRIMARY KEY, value TEXT)", type: "run" });

  const slashCommands: any = [];
  const commands = fs.readdirSync("./src/commands");
  for (const cmd of commands) {
    const commandFilePath = `../commands/${cmd}`;
    const commandFileName = path.parse(commandFilePath).name;

    const command = require(`../commands/${commandFileName}`);
    slashCommands.push(command.data.toJSON());

    client.slashCommands.set(command.data.name, command);
  }

  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: slashCommands });
    console.log(`Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error(error);
  }
};
