import { APP_DOMAIN, APP_ENABLE_ONLINE, APP_MAINTENANCE_DISCORD_WEBHOOK_URL } from '&server/env';
import RedisService from '@server/utils/Redis';

import BullMQService from './BullMQ';
//import CloudinaryService from './Cloudinary';
import DiscordWebhookService from './DiscordWebhook';
import EmailService from './Email';
import EmailQueueService from './EmailQueue';
import GoogleOAuth2Service from './Google';
import MongoDBService from './MongoDB';
import TemplatesManager from './TemplatesManager';

export const mongoDBService = new MongoDBService();
export const bullMQService = new BullMQService(RedisService);
export const emailQueueService = new EmailQueueService(RedisService);
//export const cloudinaryService = new CloudinaryService(APP_ENABLE_ONLINE);
export const templatesManager = new TemplatesManager();
export const emailService = new EmailService(APP_ENABLE_ONLINE);
export const googleOAuth2Service = new GoogleOAuth2Service();

const discordAvatar = new URL('/icons/logo.svg', APP_DOMAIN).href;
export const discordWebhookService = new DiscordWebhookService(
	'APP Maintenance Service',
	APP_MAINTENANCE_DISCORD_WEBHOOK_URL,
	discordAvatar
);

const services = [
	mongoDBService,
	emailQueueService,
	emailService,
	bullMQService,
	templatesManager /* cloudinaryService */,
];

export default services;
