declare interface SupportRequestI extends WebsiteLinkedI<ID> {
	costumerName: string;
	phone: string;
	report: string; // Markdown format
}

declare interface SupportRequestDocumentI extends SupportRequestI {}
declare interface PublicSupportRequestI<ID = string> extends SupportRequestI {
	id: ID;
}
