declare interface ContactInformationI {
	emails: string[];
	validatedEmails: string[];
	phones: PhoneI[];
	faxes?: PhoneI[];
	websites?: string[];
	socialMediaUrls?: SocialMediaUrlsI;
}
declare interface PhoneI {
	number: string;
	code?: string;
}
declare interface SocialMediaUrlsI {
	facebook?: string;
	x?: string;
	instagram?: string;
	youtube?: string;
	linkedin?: string;
}
