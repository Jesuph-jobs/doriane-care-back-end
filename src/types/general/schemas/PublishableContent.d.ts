declare interface WebsiteLinkedI<ID = string> {
	website: ID;
}
declare interface ActivatableI {
	enabled: boolean;
}
declare interface PublishableContentI<ID = string> extends WebsiteLinkedI<ID>, ActivatableI {
	slug: string;
	name: string;
	tags: string[];
	description;
	meta: MetaInformationI;
}
