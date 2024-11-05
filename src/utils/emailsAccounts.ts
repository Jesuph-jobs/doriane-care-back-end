import { APP_NOREPLY_EMAIL /* , APP_INFO_EMAIL, APP_SUPPORT_EMAIL */ } from "&server/env";

/* service details */
export const emailsAccounts: Record<EmailAccounts, string> = {
	/* 	info: APP_INFO_EMAIL,
	support: APP_SUPPORT_EMAIL, */
	noReply: APP_NOREPLY_EMAIL,
};
