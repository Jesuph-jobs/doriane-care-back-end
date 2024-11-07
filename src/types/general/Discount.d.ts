declare interface DiscountI<ID = string> extends WebsiteLinkedI<ID>, ActivatableI {
	code: string;
	value: DiscountValueI;
	maxValue?: DiscountValueI;
	expiringDate: Date;
}

declare interface DiscountDocumentI<ID = string> extends DiscountI<ID> {}
declare interface PublicDiscountI<ID = string> extends DiscountI<ID> {
	id: ID;
}
