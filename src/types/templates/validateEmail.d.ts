declare interface ValidateEmailEmailContext extends TemplateContexts {
	name: string;
	otp: string;
	validateUrl: string;
}
declare interface ValidateEmailEmailAdditionalContext {
	logo: string;
	supportEmail: string;
}

declare interface ValidateEmailTemplateContext extends ValidateEmailEmailContext, ValidateEmailEmailAdditionalContext {}
