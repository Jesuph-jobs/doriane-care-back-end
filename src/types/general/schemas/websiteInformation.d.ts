declare interface WebsiteInformationI {
	name: string;
	description: string;
	aboutUs: string; // Markdown format
	contactInformation: ContactInformationI;
	addresses: AddressI[];
	productsAttributes: ProductAdditionalKeys;
	websitePermissions: WebsiteFeaturesFlagsI;
}
