/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json" assert {type: "json"};
//import * as Embed from "../../structures/messageEmbeds.js";
//import { prisma } from "../../index.js";

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("restrict")
    .setDescription("restrict a member.")
    .addUserOption((option) =>
        option
            .setName("member")
            .setDescription("Mention someone to restrict")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("restrictions")
            .setDescription("Choose a restriction")
            .setRequired(true)
            .addChoices({ name: "Embed", value: "embed" }, { name: "Reaction", value: "reaction" }, { name: "Voice", value: "voice" }, { name: "Slash", value: "slash" })
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("reasons")
            .setDescription("Specify a reason")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return void interaction.reply({
            content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_ROLES"],
            ephemeral: true,
        });
    }
   // const database = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
    const member = interaction.options.getMember("member")!;
    const reason = interaction.options.getString("reasons")!;
    const restriction_name = interaction.options.getString("restrictions")!;
   // const data = database?.logChannelID;

    if (!member.moderatable || !member.manageable) {
        await interaction.reply({
            content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
            ephemeral: true,
        });
    }
    switch (restriction_name) {
        case "embed": {
            let Embedrole = interaction.guild.roles.cache.find((role) => role.name === "Embed Restriction");
            if (!Embedrole)
                try {
                    (Embedrole = await interaction.guild.roles.create({
                        name: "Embed Restriction",
                        color: "#514f48",
                    })),
                        Embedrole.permissions.remove("EmbedLinks", "AttachFiles");
                } catch (a: any) {
                    console.log(a.stack);
                }
            member.roles.add(Embedrole!).then(() => {
                member
                    .send(
                        `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
                    )
                    .catch((a) => console.log(a)),
                    interaction.reply({
                        content: `${member.user.username} was successfully restricted.`,
                        ephemeral: true,
                    });
            });
            break;
        }
        case "reaction": {
            let Reactionrole = interaction.guild.roles.cache.find((role) => role.name === "Reaction Restriction");
            if (!Reactionrole)
                try {
                    (Reactionrole = await interaction.guild.roles.create({
                        name: "Reaction Restriction",
                        color: "#514f48",
                    })),
                        Reactionrole.permissions.remove("AddReactions");
                } catch (a: any) {
                    console.log(a.stack);
                }
            member.roles.add(Reactionrole!).then(() => {
                member
                    .send(
                        `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
                    )
                    .catch((a) => console.log(a)),
                    interaction.reply({
                        content: `${member.user.username} was successfully restricted.`,
                        ephemeral: true,
                    });
            });
            break;
        }
        case "slash": {
            let Slashrole = interaction.guild.roles.cache.find((role) => role.name === "Slash Restriction");
            if (!Slashrole)
                try {
                    (Slashrole = await interaction.guild.roles.create({
                        name: "Slash Restriction",
                        color: "#514f48",
                    })),
                        Slashrole.permissions.remove("UseApplicationCommands")
                } catch (a: any) {
                    console.log(a.stack);
                }
            member.roles.add(Slashrole!).then(() => {
                member
                    .send(
                        `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
                    )
                    .catch((a) => console.log(a)),
                    interaction.reply({
                        content: `${member.user.username} was successfully restricted.`,
                        ephemeral: true,
                    });
            });
            break;
        }
        case "voice": {
            let Voicerole = interaction.guild.roles.cache.find((role) => role.name === "Voice Restriction");
            if (!Voicerole)
                try {
                    (Voicerole = await interaction.guild.roles.create({
                        name: "Voice Restriction",
                        color: "#514f48",
                    })),
                        Voicerole.permissions.remove("Stream", "Connect", "Speak", "UseVAD")
                } catch (a: any) {
                    console.log(a.stack);
                }
            member.roles.add(Voicerole!).then(() => {
                member
                    .send(
                        `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
                    )
                    .catch((a) => console.log(a)),
                    interaction.reply({
                        content: `${member.user.username} was successfully restricted.`,
                        ephemeral: true,
                    });
            });
            member.voice.setChannel(null);
        } break;

    }

//    if (!data || data === null) { return }
 //   const LogChannel = interaction.client.channels.cache.get(data);
  //  if (!LogChannel || LogChannel === null) { return }
   // if (LogChannel?.isTextBased()) {
    //    LogChannel?.send({
      //      embeds: [Embed.RestrictEmbed(interaction, reason, restriction_name, member)],
       // });
 //   }
}