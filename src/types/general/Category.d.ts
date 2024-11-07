declare type PublishableContentTypeI =
	| 'p' // products
	| 'b'; // blog

declare interface CategoryI<ID = string> extends PublishableContentI<ID> {
	enabled: boolean;
	for: PublishableContentTypeI;
	parentCategory?: ID; // reference to Category
}

declare interface CategoryDocumentI<ID = string> extends CategoryI<ID> {}
declare interface PublicCategoryI<ID = string> extends CategoryI<ID> {
	id: ID;
}
