declare interface OrderStatusHistoryI<ID = string> {
	changedBy: ID;
	status: OrderStatusTypes;
}
