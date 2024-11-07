declare interface ReviewI<ID = string> extends WebsiteLinkedI<ID> {
	link: LinkI<ID>;
	content: string; // Markdown format
	author: PersonalInformationI;
	rating: number; // 1-5 rating
	createdBy: Link<ID>; // CostumerID
}

declare interface ReviewDocumentI<ID = string> extends ReviewI<ID> {}
declare interface PublicReviewI<ID = string> extends ReviewI<ID> {
	id: ID;
}
