declare interface WebSiteI {
	domain: string;
	banners: BannerElementI[];
	services: ServiceElementI[];
	faqs: FAQI[];
	websiteInformation: WebsiteInformationI;
	flags: WebsiteFeaturesFlagsI;
	productAdditional: ProductAdditionalKeys[];
	priceRange: NumbersRangeI;
}

declare interface WebSiteDocumentI extends WebSiteI {}
declare interface PublicWebSiteI<ID = string> extends WebSiteI {
	id: ID;
}
