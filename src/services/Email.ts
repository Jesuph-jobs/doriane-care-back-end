import nodemailer, { type Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { cLogger } from '$server/console';

// import { fLogger } from '$server/file';
import { APP_EMAIL_HOST, APP_EMAIL_PASSWORD, APP_EMAIL_PORT, APP_EMAIL_SECURE, APP_EMAIL_USERNAME } from '&server/env';

import Service from './Service';

/* service details */
const id = 'EmailService';

class EmailService extends Service<Transporter<SMTPTransport.SentMessageInfo>> {
	name = 'Email';
	category = 'Email';
	description = 'Email Service';
	enabled: boolean;
	constructor(enabled = true) {
		super(
			id,
			enabled
				? EmailService.connect()
				: (Promise.resolve() as unknown as Promise<Transporter<SMTPTransport.SentMessageInfo>>)
		);
		this.enabled = enabled;
	}
	public static async connect() {
		return new Promise<Transporter<SMTPTransport.SentMessageInfo>>((resolve, reject) => {
			const transporter = nodemailer.createTransport({
				host: APP_EMAIL_HOST,
				port: APP_EMAIL_PORT,
				secure: APP_EMAIL_SECURE,
				auth: {
					user: APP_EMAIL_USERNAME,
					pass: APP_EMAIL_PASSWORD,
				},
				tls: {
					rejectUnauthorized: false,
					minVersion: 'TLSv1.2', // Specify the minimum TLS version
				},
			});
			transporter
				.verify()
				.then(() => {
					cLogger.info("📬 Le service d'email est prêt");
					resolve(transporter);
				})
				.catch(error => {
					cLogger.error(`📭 Erreur dans le service d'email ${error}`);
					// fLogger.error(`📭 Error in Email Service ${error}`);
					reject(error);
				});
		});
	}
	async sendEmail(mail: Mail.Options) {
		if (this.enabled)
			return this.connection.then(transporter => {
				return transporter.sendMail(mail);
			});
	}
	public stop(): Promise<void> {
		return this.connection.then(transporter => {
			return transporter.close();
		});
	}
}
export default EmailService;
