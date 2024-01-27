import { SettingCommand } from "#slashyInformations/index.js";
import { createSettings, permission, settingEmbed } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import guilds from "#database/models/guilds.js";
import i18next from "i18next";
import { guild } from "#utils/types/database.js";

export default class extends Command<typeof SettingCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof SettingCommand>,
		locale: LocaleParam
	): Promise<void> {
		//console.log(Object.keys(args));
		const channels = interaction.options.getString("channels");
		const choice = interaction.options.getString("choice");
		const chan = interaction.options.getChannel("channel");
		const guildSettings = await guilds.findOne({
			guildID: interaction.guild.id
		});
		const doc = await guilds.findOne();

		await someFunction(doc);

		async function someFunction(doc: guild) {
			if (doc.auditLogEvent === true) {
				return console.log("im true here");
			} else {
				return console.log("in not true");
			}
		}

		console.log(someFunction);

		if (!(await permission(interaction, "ManageGuild"))) {
			return;
		}
		if (!guildSettings) {
			await createSettings(interaction);
			await interaction.reply({
				content: i18next.t("command.config.common.errors.no_settings", { lng: locale }),
				ephemeral: true
			});
			return;
		}
		switch (Object.keys(args)[0]) {
			case "show": {
				await interaction.deferReply({ ephemeral: args.show.hide ?? true });
				await interaction.editReply({ embeds: [settingEmbed(interaction, guildSettings, locale)] });
				break;
			}
			case "audit_log": {
				await interaction.deferReply({ ephemeral: args.audit_log.hide ?? true });
				choice
					? guildSettings.updateOne({ auditLogEvent: true }).then(() =>
							interaction.editReply({
								content: i18next.t("command.config.events.enabled", {
									event: args[0].name,
									lng: locale
								})
							})
						)
					: await guildSettings.updateOne({ auditLogEvent: false }).then(() =>
							interaction.editReply({
								content: i18next.t("command.config.events.disabled", { event: args[0].name, lng: locale })
							})
						);
				break;
			}
			case "channels": {
				await interaction.deferReply({ ephemeral: args.channels.hide ?? true });
				const isTextBased = chan?.isTextBased();
				switch (channels) {
					case "welcomechannel":
						{
							isTextBased
								? await guildSettings.updateOne({ welcomeChannelID: chan.id }).then(() =>
										interaction.editReply({
											content: i18next.t("command.config.events.channel_set", {
												channel: "Welcome Channel",
												channel_id: chan,
												lng: locale
											})
										})
									)
								: await guildSettings.updateOne({ welcomeChannelID: null }).then(() =>
										interaction.editReply({
											content: i18next.t("command.config.events.channel_removed", { lng: locale })
										})
									);
						}

						break;
					case "modlog": {
						isTextBased
							? await guildSettings.updateOne({ logChannelID: chan.id }).then(() =>
									interaction.editReply({
										content: i18next.t("command.config.events.channel_set", {
											channel: "Mod Logs",
											channel_id: chan,
											lng: locale
										})
									})
								)
							: await guildSettings.updateOne({ logChannelID: null }).then(() =>
									interaction.editReply({
										content: i18next.t("command.config.events.channel_removed", { lng: locale })
									})
								);
					}
				}
				break;
			}
			//TODO !! events case
			case "events": {
				await interaction.deferReply({ ephemeral: args.events.hide ?? true });

				guildSettings.updateOne({ auditLogEvent: true });
				break;
			}
			default:
				break;
		}
	}
}
