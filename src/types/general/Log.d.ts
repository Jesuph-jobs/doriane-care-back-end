declare interface LogI<ID = string> extends WebsiteLinkedI<ID> {
	action: string;
	user: ID; // UserID
}
