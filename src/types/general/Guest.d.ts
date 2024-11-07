declare interface GuestI<ID = string> extends WebsiteLinkedI<ID> {
	name: string;
	phone: string;
}

declare interface GuestDocumentI<ID = string> extends GuestI<ID> {}
declare interface PublicGuestI<ID = string> extends GuestI<ID> {
	id: ID;
}
