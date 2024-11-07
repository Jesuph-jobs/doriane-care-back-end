declare type OrderStatusTypes = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

declare interface OrderI<ID = string> extends WebsiteLinkedI<ID> {
	costumer: LinkI<ID>; // CostumerID or GuestID
	products: ProductsCartI<ID>[]; // Array of productIDs
	totalPrice: number;
	status: OrderStatusTypes;
	statusHistory: OrderStatusHistoryI<ID>[];
	delivery: DeliveryI;
}

declare interface OrderDocumentI<ID = string> extends OrderI<ID> {}
declare interface PublicOrderI<ID = string> extends OrderI<ID> {
	id: ID;
}
