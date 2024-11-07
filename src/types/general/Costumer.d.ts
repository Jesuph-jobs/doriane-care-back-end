declare interface CostumerI<ID = string> extends GuestI<ID>, ActivatableI {
	email: string;
	password: string;
	ordersHistory: ID[];
	wishlist: ID[]; // productIDs
}

declare interface CostumerDocumentI<ID = string> extends CostumerI<ID> {}

declare interface PublicCostumerI<ID = string> extends Omit<CostumerI<ID>, 'password' | 'ordersHistory' | 'wishlist'> {
	id: ID;
}
