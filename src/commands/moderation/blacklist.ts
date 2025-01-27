import { BlacklistCommand } from "#slashyInformations/index.js";
import { addUserBlacklist, permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import user from "#database/models/users.js";

export default class extends Command<typeof BlacklistCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof BlacklistCommand>, locale: LocaleParam): Promise<void> {
		if (!(await permission(interaction, "ManageGuild"))) {
			return;
		}

		const member = args.target.member ?? interaction.options.getMember("target");
		const users = await user.findOne({ userID: member.id });

		if (users.blacklisted === true) {
			interaction.editReply({
				content: i18next.t("This user is already blacklisted.", { lng: locale })
			});
			return;
		} else {
			await addUserBlacklist(member).then(async () => {
				interaction.editReply({
					content: i18next.t("This user has been added to the blacklist.", { lng: locale })
				});
			});
		}
	}
}
