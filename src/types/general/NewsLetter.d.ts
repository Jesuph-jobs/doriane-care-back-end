declare interface NewsLetterI<ID = string> extends WebsiteLinkedI<ID> {
	email: string;
	subscribed: boolean;
}

declare interface NewsLetterDocumentI<ID = string> extends NewsLetterI<ID> {}
declare interface PublicNewsLetterI<ID = string> extends NewsLetterI<ID> {
	id: ID;
}
