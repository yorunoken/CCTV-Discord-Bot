import { ChatInputCommandInteraction, InteractionType } from "discord.js";
import { MyClient } from "..";

export const name = "interactionCreate";
export const execute = async (interaction: ChatInputCommandInteraction, client: MyClient) => {
  if (interaction.type !== InteractionType.ApplicationCommand) {
    return;
  }

  try {
    const command = client.slashCommands.get(interaction.commandName);
    command.run({ client, interaction });
  } catch (e) {
    console.error(e);
    interaction.reply({ content: "There was an error with this interaction. Please try again.", ephemeral: true });
  }
};
