import guilds from "#database/models/guilds.js";
import users from "#database/models/users.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { ChatInputCommandInteraction, Guild, GuildMember, PermissionResolvable } from "discord.js";
import i18next from "i18next";
let locale: string;

export async function permission(interaction: InteractionParam, permission: PermissionResolvable) {
	const perms = interaction.guild.members.me.permissions.has(permission);
	if (!perms && interaction.deferred) {
		await interaction.editReply({
			content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: locale })
		});
		return perms;
	} else {
		if (!perms && !interaction.deferred)
			await interaction.reply({
				content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: locale })
			});
	}
	return perms;
}

export async function createSettings(param: Guild | ChatInputCommandInteraction<"cached">) {
	const paramCondition = param instanceof ChatInputCommandInteraction;

	await guilds.create({
		guildID: paramCondition ? param.guild.id : param.id,
		name: paramCondition ? param.guild.name : param.name,
		auditLogEvent: false,
		logChannelID: null,
		welcomeChannelID: null,
		guildSettings: [
			{
				antiRaid: false,
				botUpdate: false,
				roleUpdate: false,
				guildUpdate: false,
				emojiUpdate: false,
				inviteUpdate: false,
				threadUpdate: false,
				memberUpdate: false,
				messageUpdate: false,
				channelUpdate: false,
				stickerUpdate: false,
				webhookUpdate: false,
				autoModeration: false,
				integrationUpdate: false,
				commandPermission: false,
				stageInstanceUpdate: false,
				guildScheduledUpdate: false
			}
		]
	});
	return createSettings;
}

export async function addUserBlacklist(member: GuildMember) {
	await users.create({
		guildID: member.guild.id,
		userID: member.id,
		blacklisted: true
	});
	return addUserBlacklist;
}

export function isEnabled(name: boolean) {
	return name ? "Enabled" : "Disabled";
}

export function emojify(mode: boolean) {
	return mode ? "✅" : "❌";
}
