declare type LinkKeys = 'Website' | 'Product' | 'Collection' | 'Category' | 'Blog' | 'Costumer' | 'Guest';
declare interface LinkI<ID = string> {
	ref: ID;
	collection: LinkKeys;
}
