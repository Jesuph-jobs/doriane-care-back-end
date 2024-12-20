import { URL } from 'node:url';
import { Queue } from 'bullmq';
import type IORedis from 'ioredis';

import { cLogger } from '$server/console';

import { FY_DOMAIN, FY_EMAIL_QUEUE_NAME } from '&server/env';

import type { OTPSessionHydratedDocument } from '!common/generated/models/OTPSession';
import Service from '@common/services/Service';

/* service details */
const defaultId = 'EmailService';

class EmailQueueService extends Service<Queue<QueuedEmail>> {
	name = 'Email queue service';
	category = 'Email';
	description = "Service d'email pour la mise en file d'attente des courriels";

	redisClient: IORedis;

	constructor(redisClient: IORedis, id = defaultId) {
		super(id, EmailQueueService.connect(Promise.resolve(redisClient)));
		this.redisClient = redisClient;
		this.connection.then(() => {
			cLogger.info("📬 Le service de file d'attente pour les e-mails est prêt");
		});
	}

	public static async connect(connection: Promise<IORedis>): Promise<Queue<QueuedEmail>> {
		return connection.then(conn => {
			const queue = new Queue<QueuedEmail>(FY_EMAIL_QUEUE_NAME, {
				connection: conn,
			});
			return queue.waitUntilReady().then(() => queue);
		});
	}

	public sendEmail(email: QueuedEmail) {
		return this.connection
			.then(queue => queue.add('sendEmail', email))
			.then(job => cLogger.info(`📨 Email sent: ${job.id}`));
	}

	public static RecoveryEmail(
		user: NecessaryUserI,
		language: LanguagesI,
		session: OTPSessionHydratedDocument,
		otp: string
	): QueuedEmail {
		return {
			to: user.email,
			subject: 'FY - password recovery',
			context: {
				name: `${user.personalInformation.firstName} ${user.personalInformation.lastName}`,
				resetUrl: new URL(`/auth/session/reset-password?sessionId=${session._id}&otpCode=${otp}`, FY_DOMAIN)
					.href,
				language,
				otp,
			},
			template: 'resetPassword',
			from: 'noReply',
		};
	}

	public static ValidationEmail(
		user: NecessaryUserI,
		language: LanguagesI,
		session: OTPSessionHydratedDocument,
		otp: string
	): QueuedEmail {
		return {
			to: user.email,
			subject: 'FY - email validation',
			context: {
				name: `${user.personalInformation.firstName} ${user.personalInformation.lastName}`,
				validateUrl: new URL(`/validate/email?sessionId=${session._id}&otpCode=${otp}`, FY_DOMAIN).href,
				language,
				otp: otp,
			},
			template: 'validateEmail',
			from: 'noReply',
		};
	}
	public static ResetedPasswordEmail(
		user: NecessaryUserI,
		language: LanguagesI,
		password: string
	): QueuedEmail<'resetedPassword'> {
		return {
			to: user.email,
			subject: 'FY manager - reseted password',
			context: {
				name: `${user.personalInformation.firstName} ${user.personalInformation.lastName}`,
				language,
				password,
			},
			template: 'resetedPassword',
			from: 'noReply',
		};
	}

	public async stop() {
		return this.connection.then(conn => conn.close().then(() => this.redisClient.disconnect()));
	}
}
export default EmailQueueService;
