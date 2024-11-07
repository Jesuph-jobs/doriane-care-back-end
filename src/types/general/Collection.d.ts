declare interface CollectionI<ID = string> extends PublishableContentI<ID> {
	isPublic: boolean;
	products: ID[]; // productIDs
	for: PublishableContentTypeI;
}

declare interface CollectionDocumentI<ID = string> extends CollectionI<ID> {}
declare interface PublicCollectionI<ID = string> extends CollectionI<ID> {
	id: ID;
}
