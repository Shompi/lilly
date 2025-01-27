import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const BanCommand = {
	name: "ban",
	description: "Ban a member",
	description_localizations: {
		fr: "Bannissement d'un membre",
		"es-ES": "Banea a un miembro"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				"es-ES": "target"
			},
			description: "Select a user to ban.",
			description_localizations: {
				fr: "Sélectionner l'utilisateur a bannir.",
				"es-ES": "Selecciona al usuario para banear."
			},
			required: true
		},

		{
			type: ApplicationCommandOptionType.Number,
			name: "days",
			name_localizations: {
				fr: "jours",
				"es-ES": "dias"
			},
			description: "number of days that you want to delete.",
			description_localizations: {
				fr: "nombre de jour que vous voulez supprimer.",
				"es-ES": "Cantidad de dias de mensajes que quieres eliminar."
			},
			choices: [
				{
					name: "0 day",
					value: 0
				},
				{
					name: "1 day",
					value: 86400
				},
				{
					name: "2 days",
					value: 172800
				},
				{
					name: "3 days",
					value: 259200
				},
				{
					name: "4 days",
					value: 345600
				},
				{
					name: "5 days",
					value: 432000
				},
				{
					name: "6 days",
					value: 518400
				},
				{
					name: "7 days",
					value: 604800
				}
			],
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison",
				"es-ES": "razón"
			},
			description: "Reason of the ban.",
			description_localizations: {
				fr: "Raison du ban.",
				"es-ES": "Razón del ban."
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				"es-ES": "ocultar"
			},
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque(cacher) le résultat.",
				"es-ES": "No mostrar públicamente el resultado de esta acción."
			}
		}
	],
	default_member_permissions: "0"
} as const;
