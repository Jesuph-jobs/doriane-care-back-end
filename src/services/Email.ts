import nodemailer, { type Transporter } from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import { cLogger } from '$server/console';

// import { fLogger } from '$server/file';
import { FY_EMAIL_HOST, FY_EMAIL_PASSWORD, FY_EMAIL_PORT, FY_EMAIL_SECURE, FY_EMAIL_USERNAME } from '&server/env';
import Service from '@common/services/Service';

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
				host: FY_EMAIL_HOST,
				port: FY_EMAIL_PORT,
				secure: FY_EMAIL_SECURE,
				auth: {
					user: FY_EMAIL_USERNAME,
					pass: FY_EMAIL_PASSWORD,
				},
				tls: {
					rejectUnauthorized: false,
					minVersion: 'TLSv1.2', // Specify the minimum TLS version
				},
			});
			transporter
				.verify()
				.then(() => {
					cLogger.info('📬 The email service is ready');
					resolve(transporter);
				})
				.catch(error => {
					cLogger.error(`📭 Error in Email Service ${error}`);
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
