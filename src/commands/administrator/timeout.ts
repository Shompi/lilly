/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json" assert {type: "json"};
//import * as Embed from "../../structures/messageEmbeds.js";
//import { prisma } from "../../index.js";

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("timeout a member.")
    .addUserOption((option) =>
        option.setName("target").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
        option.setName("time").setDescription("time for timeout")
            .addChoices({ name: "5min", value: "300000" }, { name: "10min", value: "600000" }, { name: "15min", value: "900000" },
                { name: "30min", value: "1800000" }, { name: "45min", value: "2700000" }, { name: "1d", value: "86400000" }, { name: "2d", value: "172800000" },
                { name: "3d", value: "259200000" }, { name: "4d", value: "345600000" }, { name: "5d", value: "432000000" }, { name: "6d", value: "518400000" },
                { name: "1week", value: "604800000" }, { name: "2weeks", value: "1209600000" }, { name: "28days", value: "2419200000" }).setRequired(true))

    .addStringOption((option) =>
        option
            .setName("reason")
            .setDescription("reason to timeout")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    if (
        !interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ModerateMembers)
    ) {
        return void interaction.reply({
            content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MODERATE_MEMBERS"],
            ephemeral: true,
        });
    }
    const member = interaction.options.getMember("target")!;
    const time = interaction.options.getString("time")!;
    const reason = interaction.options.getString("reason")!;
    //const database = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
    if (!member.moderatable || !member.manageable) {
        await interaction.reply({
            content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
            ephemeral: true,
        });
    }
    member
        .timeout(+time, reason)
        .then(() => {
            member
                .send(
                    `Hello, you have been timeout in ${interaction.guild.name} for: ${reason}`
                )
                .catch((err) => console.log(err)),
                interaction.reply({
                    content: `${member.user.username} was successfully timeout.`,
                    ephemeral: true,
                });
        })
        .catch((err) => console.log(err));

  //  const g = database?.logChannelID;
    //if (!g || g === null) { return }
    //const LogChannel = interaction.client.channels.cache.get(g);
    //if (!LogChannel || LogChannel === null) { return }
    //if (LogChannel?.isTextBased()) {
     //   LogChannel?.send({ embeds: [Embed.AdminEmbed(interaction, member!, reason!)] });
   // }

};