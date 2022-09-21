import { SlashCommandBuilder } from "@discordjs/builders";
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "src/structures/index.js";
import puns from "../../Structures/JSONs/pun.json" assert {type: "json"};

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
  .setName("pun")
  .setDescription("say a punny thing.")

export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
  return void interaction.reply(`${puns[Math.floor(Math.random() * puns.length)]}`);
}
