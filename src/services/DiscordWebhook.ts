import { cLogger } from '$server/console';
import Service from '@common/services/Service';

/* service details */
const defaultId = 'DiscordWebhookService';

interface DiscordUserI {
	username: string;
	avatar_url?: string;
}

export default class DiscordWebhookService extends Service<void> {
	name = 'Discord Webhook';
	category = 'Notification';
	description = 'Handles Discord webhooks';

	private webhookUrl: string;
	private username: string;
	private avatar_url?: string;

	constructor(username: string, webhookUrl: string, avatar_url?: string, id = defaultId) {
		super(id, Promise.resolve());
		this.webhookUrl = webhookUrl;
		this.username = username;
		this.avatar_url = avatar_url;
	}

	public async sendToDiscord(content: string, timestamp?: Date): Promise<void> {
		const payload = DiscordWebhookService.ServerStateChangePayload(
			content,
			{
				username: this.username,
				avatar_url: this.avatar_url,
			},
			timestamp
		);
		try {
			const response = await fetch(this.webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) throw new Error(`(${response.statusText}) ${await response.text()}`);
			cLogger.info(`📨 Message sent to Discord! ${await response.text()}`);
		} catch (error) {
			cLogger.error(`Error sending message to Discord: ${error}`);
		}
	}

	public static ServerStateChangePayload(content: string, discordUser: DiscordUserI, timestamp?: Date) {
		return {
			username: discordUser.username,
			avatar_url: discordUser.avatar_url,
			embeds: [
				{
					title: 'Server State Change',
					description: `**Content:**\n${content}`,
					color: 0xff5733, // Customize the color of the embed (in decimal format)
					author: {
						name: 'app accounts server', // Customize the author name
						icon_url: discordUser.avatar_url, // Customize the author icon URL
					},
					timestamp: timestamp ? timestamp.toISOString() : new Date().toISOString(),
				},
			],
		};
	}
	public stop(): Promise<void> {
		return Promise.resolve();
	}
}
