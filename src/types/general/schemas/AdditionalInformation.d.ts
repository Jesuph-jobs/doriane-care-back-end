declare type ProductAdditionalNumberKeys = 'size' | 'weight' | 'dimensions' | 'expirationDate';
declare type ProductAdditionalStringKeys =
	| 'ingredients'
	| 'benefits'
	| 'usage'
	| 'careInstructions'
	| 'allergenInformation'
	| 'manufacturer'
	| 'material'
	| 'color'
	| 'features'
	| 'warranty'
	| 'countryOfOrigin'
	| 'storageInstructions'
	| 'nutritionalInformation'
	| 'note'
	| 'otherDetails';
declare type ProductAdditionalKeys = ProductAdditionalStringKeys | ProductAdditionalNumberKeys;

declare type ProductAdditionalNumber = Optional<Record<ProductAdditionalNumberKeys, UnitedValueI>>;
declare type ProductAdditionalString = Optional<Record<ProductAdditionalStringKeys, string>>;
declare type ProductAdditionalI = ProductAdditionalNumber & ProductAdditionalString;
declare type ProductAdditionalFlagsI = Record<ProductAdditionalStringKeys, boolean>;
