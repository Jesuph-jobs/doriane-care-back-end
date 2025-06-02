import { describe, it, expect, vi, beforeAll } from 'vitest';
import EmailService from '../src/services/Email';
import type Mail from 'nodemailer/lib/mailer';
import { FY_EMAIL_USERNAME } from '&server/env';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

describe('EmailService', () => {
	let emailService: EmailService;

	beforeAll(async() => {
		emailService = new EmailService(true);
        await emailService.Connection;
	});

	it('should instantiate EmailService', () => {
		expect(emailService).toBeInstanceOf(EmailService);
		expect(emailService.enabled).toBe(true);
	});

	it('should connect and resolve a transporter', async () => {
		const transporter = await emailService.Connection;
		expect(transporter).toHaveProperty('sendMail');
	});

	it('should send an email', async () => {
        const mailOptions: Mail.Options = {
            from: FY_EMAIL_USERNAME,
            to: 'tahher@live.fr',
            subject: 'Test Email',
            text: 'This is a test email sent from the EmailService.',
            html: '<p>This is a test email sent from the EmailService.</p>',
        };
        await emailService.sendEmail(mailOptions).then(info => {
            // expect info to not be undefined
            expect(info).toBeDefined();
            const existingInfo= info as  SMTPTransport.SentMessageInfo;
            expect(existingInfo).toHaveProperty('accepted');
            expect(existingInfo.accepted).toContain('tahher@live.fr');
        }).catch(error => {
            console.error('Error sending email:', error);
            expect(error).toBeNull(); // Ensure no error is thrown
        });
    });
    it('should handle errors when sending email', async () => {
        const mailOptions: Mail.Options = {
            from: FY_EMAIL_USERNAME,
            to: 'invalid-email',
            subject: 'Test Email',
            text: 'This is a test email sent from the EmailService.',
            html: '<p>This is a test email sent from the EmailService.</p>',
        };
        await expect(emailService.sendEmail(mailOptions)).rejects.toThrow();
    });
    afterAll(async () => {
        await emailService.stop();
    });

});
