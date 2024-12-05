//import EmailService from './Email';
//import EmailQueueService from './EmailQueue';
//import GoogleOAuth2Service from './Google';
import MongoDBService from './MongoDB';
import RolesManagerService from './Roles';
//import TemplatesManager from './TemplatesManager';
import WebsitesManagerService from './Websites';

export const mongoDBService = new MongoDBService();
//export const bullMQService = new BullMQService(RedisService);
//export const emailQueueService = new EmailQueueService(RedisService);
//export const cloudinaryService = new CloudinaryService(FY_ENABLE_ONLINE);
//export const templatesManager = new TemplatesManager();
//export const emailService = new EmailService(FY_ENABLE_ONLINE);
//export const googleOAuth2Service = new GoogleOAuth2Service();
export const rolesManagerService = new RolesManagerService();
export const websitesManagerService = new WebsitesManagerService();
/* 
const discordAvatar = new URL('/icons/logo.svg', FY_DOMAIN).href;
export const discordWebhookService = new DiscordWebhookService(
	'APP Maintenance Service',
	FY_MAINTENANCE_DISCORD_WEBHOOK_URL,
	discordAvatar
);
 */
const services = [
	mongoDBService,
	//emailQueueService,
	//emailService,
	//bullMQService,
	//templatesManager,
	// cloudinaryService ,
	rolesManagerService,
	websitesManagerService,
];
export type ServicesTypes = (typeof services)[number];

export default services;
