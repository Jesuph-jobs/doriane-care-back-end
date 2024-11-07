export const TransactionsPermissions: Record<TransactionsPermissionsIdsI, PermissionsI> = {
	//Dashboard Permissions:

	'transactions:view_all': {
		id: 'transactions:view_all',
		name: 'Transactions View All',
		description: 'Transactions View All',
		requires: [],
	},
};
export const TransactionsPermissionsD = Object.values(TransactionsPermissions);
