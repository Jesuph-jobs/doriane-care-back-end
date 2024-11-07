declare type WebsiteFeaturesFlagsKeys =
	| 'guest-review' // allow costumer to write a review without registering only with personal information[guest costumer ]
	| 'display-reviews-on-homepage'
	| 'costumer-wishlist'
	| 'guest-checkout'
	| 'price-filter'
	| 'categories-filter'
	| 'collections-filter'
	| 'delivery-status-notification'
	| 'price-drop-notification'
	| 'image-zoom'
	| 'in-product-checkout'
	// | 'sales-count-down'
	| 'website-blogs';

declare type WebsiteFeaturesFlagsI = Record<WebsiteFeaturesFlagsKeys, boolean>;
