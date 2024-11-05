import { Processor, Worker } from 'bullmq';
import IORedis from 'ioredis';

import { cLogger } from '$server/console';

import { emailsAccounts } from '@server/utils/emailsAccounts';
// import { fLogger } from '$server/file';
import { APP_EMAIL_QUEUE_NAME } from '&server/env';

import Service from './Service';
import { emailService, templatesManager } from '.';

const id = 'BulletMQService';
class BullMQService extends Service<Worker<QueuedEmail>> {
	name = 'Messaging Queue';
	category = 'Messaging';
	description = "Service de file d'attente de messagerie";
	redisClient: IORedis;
	constructor(redisClient: IORedis) {
		super(id, BullMQService.connect(Promise.resolve(redisClient)));
		this.redisClient = redisClient;
		this.connection.then(() => {
			cLogger.info("📬 Le service de gestion des files d'attente est prêt");
		});
	}
	public static async connect(connection: Promise<IORedis>): Promise<Worker<QueuedEmail>> {
		return connection.then((conn) => {
			const worker = new Worker<QueuedEmail>(APP_EMAIL_QUEUE_NAME, BullMQService.onEmailArrive, {
				connection: conn,
			});
			return worker.waitUntilReady().then(() => worker);
		});
	}
	public static onEmailArrive: Processor<QueuedEmail> = async (job) => {
		cLogger.info(
			`📧 Email ${job.id || 'unknown'} received for ${job.data.subject} with the template : ${job.data.template}`
		);
		return templatesManager.render(job.data.template, job.data.context).then((html) => {
			return emailService
				.sendEmail({
					subject: job.data.subject,
					to: job.data.to,
					cc: job.data.cc,
					bcc: job.data.bcc,
					html,
					date: new Date(job.timestamp),
					from: emailsAccounts[job.data.from],
				})
				.then((info) => {
					if (info) {
						info.rejected?.forEach((recipient) => {
							cLogger.error(`📧 Email ${job.id || 'unknown'} à ${recipient} rejetée`);
						});
						info.accepted.forEach((recipient) => {
							cLogger.info(`📧 Email ${job.id || 'unknown'} à ${recipient} acceptée`);
						});
					} else {
						cLogger.warn(`📧 Email ${job.id || 'unknown'}  ete annule`);
						// job.moveToDelayed()
					}
				})
				.catch((error) => {
					cLogger.error(`📧 Email ${job.id || 'unknown'} à ${job.data.to} a échoué avec ${error}`);
				});
		});
	};
	public async stop() {
		return this.connection.then((conn) => conn.close());
	}
}
export default BullMQService;
