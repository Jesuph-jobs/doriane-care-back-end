declare interface EmailContexts {
	resetPassword: ResetPasswordEmailContext;
	validateEmail: ValidateEmailEmailContext;
}
declare interface AdditionalContext {
	resetPassword: ResetPasswordEmailAdditionalContext;
	validateEmail: ValidateEmailEmailAdditionalContext;
}

declare type EmailTemplates = keyof EmailContexts;

declare type EmailAccounts = /* 'info' | 'support' | */ "noReply";

declare interface QueuedEmail<T extends EmailTemplates = EmailTemplates> {
	from: EmailAccounts;
	to: string | string[];
	cc?: string | string[];
	bcc?: string | string[];
	subject: string;
	template: T;
	context: EmailContexts[T];
}
