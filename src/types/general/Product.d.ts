declare interface ProductI<ID = string> extends PublishableContentI<ID> {
	sku: string;
	flags: ProductFlagsI;
	createdBy: ID; // UserID
	category?: ID; // CategoryID
	images: string[]; // array of URLs
	pricing: PricingI;
	additional: ProductAdditionalI;
	ratingAggregation: RatingAggregationI;
	soldAggregation: SoldAggregationI;
}

declare interface ProductDocumentI<ID = string> extends ProductI<ID> {}
declare interface PublicProductI<ID = string> extends ProductI<ID> {
	id: ID;
}
