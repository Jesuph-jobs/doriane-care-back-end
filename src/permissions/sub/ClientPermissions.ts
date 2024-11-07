export const ClientManagementPermissions: Record<ClientManagementPermissionsIdsI, PermissionsI> = {
	'client:create': {
		id: 'client:create',
		name: 'Client Create',
		description: 'Client Create',
		requires: ['client:view', 'client:enable'],
	},
	'client:enable': {
		id: 'client:enable',
		name: 'Client Enable',
		description: 'Client Enable',
		requires: ['client:view'],
	},
	'client:edit': {
		id: 'client:edit',
		name: 'Client Edit',
		description: 'Client Edit',
		requires: ['client:view'],
	},
	'client:edit_pin': {
		id: 'client:edit_pin',
		name: 'Client Pin',
		description: 'Client Pin',
		requires: ['client:view', 'client:edit'],
	},
	'client:edit_password': {
		id: 'client:edit_password',
		name: 'Client Password',
		description: 'Client Password',
		requires: ['client:view', 'client:edit'],
	},
};
export const ClientShipmentPermissions: Record<ClientShipmentPermissionsIdsI, PermissionsI> = {
	/* client Shipments */
	'client:view_shipments': {
		id: 'client:view_shipments',
		name: 'Client View Shipments',
		description: 'Client View Shipments',
		requires: ['client:view'],
	},
	'client:create_shipment': {
		id: 'client:create_shipment',
		name: 'Client Create Shipment',
		description: 'Client Create Shipment',
		requires: ['client:view'],
	},
};
export const ClientProductPermissions: Record<ClientProductsPermissionsIdsI, PermissionsI> = {
	/* client products */
	'client:create_product': {
		id: 'client:create_product',
		name: 'Client Create Product',
		description: 'Client Create Product',
		requires: ['client:view'],
	},
	'client:view_products': {
		id: 'client:view_products',
		name: 'Client View Products',
		description: 'Client View Products',
		requires: ['client:view'],
	},
};
export const ClientTransactionPermissions: Record<ClientTransactionsPermissionsIdsI, PermissionsI> = {
	/* client balance */
	'client:view_balance': {
		id: 'client:view_balance',
		name: 'Client View Balance',
		description: 'Client View Balance',
		requires: ['client:view'],
	},
	/* Transactions */
	'client:view_transactions': {
		id: 'client:view_transactions',
		name: 'Client View Transactions',
		description: 'Client View Transactions',
		requires: ['client:view'],
	},
	'client:extract_money': {
		id: 'client:extract_money',
		name: 'Client Extract Money',
		description: 'Client Extract Money',
		requires: ['client:view'],
	},
};
export const ClientActivityPermissions: Record<ClientActivitiesPermissionsIdsI, PermissionsI> = {
	/* logs */
	'client:view_activity_logs': {
		id: 'client:view_activity_logs',
		name: 'Client View Activity Logs',
		description: 'Client View Activity Logs',
		requires: ['client:view'],
	},
};
export const ClientIntegrationPermissions: Record<ClientIntegrationPermissionsIdsI, PermissionsI> = {
	// UPS Integration Permissions
	'client:view_integration': {
		id: 'client:view_integration',
		name: 'Client View Integration',
		description: 'Client View Integration',
		requires: ['client:view'],
	},
	'client:revoke_integration': {
		id: 'client:revoke_integration',
		name: 'Client Revoke Integration',
		description: 'Client Revoke Integration',
		requires: ['client:view', 'client:view_integration'],
	},
	'client:edit_integration': {
		id: 'client:edit_integration',
		name: 'Client Edit Integration',
		description: 'Client Edit Integration',
		requires: ['client:view', 'client:view_integration'],
	},
};
export const ClientPaymentMethodPermissions: Record<ClientPaymentMethodPermissionsIdsI, PermissionsI> = {
	'client:view_payment_method': {
		id: 'client:view_payment_method',
		name: 'Client View Payment Method',
		description: 'Client View Payment Method',
		requires: ['client:view'],
	},
	'client:edit_payment_method': {
		id: 'client:edit_payment_method',
		name: 'Client Edit Payment Method',
		description: 'Client Edit Payment Method',
		requires: ['client:view', 'client:view_payment_method'],
	},
};
export const ClientPaymentSettingsPermissions: Record<ClientPaymentSettingsPermissionsIdsI, PermissionsI> = {
	'client:view_payment_settings': {
		id: 'client:view_payment_settings',
		name: 'Client View Payment Method',
		description: 'Client View Payment Method',
		requires: ['client:view'],
	},
	'client:edit_payment_settings': {
		id: 'client:edit_payment_settings',
		name: 'Client Edit Payment Method',
		description: 'Client Edit Payment Method',
		requires: ['client:view', 'client:view_payment_settings'],
	},
};
export const ClientAddressPermissions: Record<ClientAddressesPermissionsIdsI, PermissionsI> = {
	/* client addresses */
	'client:view_addresses': {
		id: 'client:view_addresses',
		name: 'Client View Addresses',
		description: 'Client View Addresses',
		requires: ['client:view'],
	},
	'client:create_address': {
		id: 'client:create_address',
		name: 'Client Create Address',
		description: 'Client Create Address',
		requires: ['client:view'],
	},
	'client:make_default_address': {
		id: 'client:make_default_address',
		name: 'Client Make Default Address',
		description: 'Client Make Default Address',
		requires: ['client:view'],
	},
	'client:unlink_address': {
		id: 'client:unlink_address',
		name: 'Client Unlink Address',
		description: 'Client Unlink Address',
		requires: ['client:view'],
	},
};
export const ClientGlobalPermissions: Record<ClientGlobalPermissionsIdsI, PermissionsI> = {
	// Client Permissions:
	'client:all': {
		id: 'client:all',
		name: 'Client All',
		description: 'Client All',
		requires: [
			'client:view',
			'client:view_my_clients',
			'client:create',
			'client:enable',
			'client:edit',
			'client:edit_pin',
			'client:edit_password',
			'client:view_shipments',
			'client:create_shipment',
			'client:view_products',
			'client:create_product',
			'client:view_addresses',
			'client:create_address',
			'client:make_default_address',
			'client:unlink_address',
			'client:view_balance',
			'client:view_transactions',
			'client:extract_money',
			'client:view_activity_logs',
			'client:view_integration',
			'client:edit_integration',
			'client:revoke_integration',
			'client:view_payment_method',
			'client:edit_payment_method',
		],
	},
	'client:view': {
		id: 'client:view',
		name: 'Client View',
		description: 'Client View',
		requires: [],
	},
	'client:view_my_clients': {
		id: 'client:view_my_clients',
		name: 'Client View My Clients',
		description: 'Client View My Clients',
		requires: ['client:view'],
	},
	'client:view_all_clients': {
		id: 'client:view_all_clients',
		name: 'Client View All Clients',
		description: 'Client View all Clients',
		requires: ['client:view'],
	},
	'client:view_desk_clients': {
		id: 'client:view_desk_clients',
		name: 'Client View Desk Clients',
		description: 'Client View Desk Clients',
		requires: ['client:view'],
	},
};
export const ClientDesksPermissions: Record<ClientDesksPermissionsIdsI, PermissionsI> = {
	/* client addresses */
	'client:view_desks': {
		id: 'client:view_desks',
		name: 'Client View Desks',
		description: 'Client View Desks',
		requires: ['client:view'],
	},
	'client:assign_desk': {
		id: 'client:assign_desk',
		name: 'Client Add Desk',
		description: 'Client Add Desk',
		requires: ['client:view'],
	},
	'client:unassign_desk': {
		id: 'client:unassign_desk',
		name: 'Client Unlink Desk',
		description: 'Client Unlink Desk',
		requires: ['client:view'],
	},
};
export const ClientPermissions: Record<ClientPermissionsIdsI, PermissionsI> = {
	...ClientGlobalPermissions,
	...ClientManagementPermissions,
	...ClientActivityPermissions,
	...ClientIntegrationPermissions,
	...ClientPaymentSettingsPermissions,
	...ClientPaymentMethodPermissions,
	...ClientAddressPermissions,
	...ClientDesksPermissions,
	...ClientProductPermissions,
	...ClientShipmentPermissions,
	...ClientTransactionPermissions,
};
export const ClientPermissionsD = Object.values(ClientPermissions);
export const ClientGlobalPermissionsD = Object.values(ClientGlobalPermissions);
export const ClientManagementPermissionsD = Object.values(ClientManagementPermissions);
export const ClientActivityPermissionsD = Object.values(ClientActivityPermissions);
export const ClientIntegrationPermissionsD = Object.values(ClientIntegrationPermissions);
export const ClientPaymentSettingsPermissionsD = Object.values(ClientPaymentSettingsPermissions);
export const ClientPaymentMethodPermissionsD = Object.values(ClientPaymentMethodPermissions);
export const ClientAddressPermissionsD = Object.values(ClientAddressPermissions);
export const ClientProductPermissionsD = Object.values(ClientProductPermissions);
export const ClientShipmentPermissionsD = Object.values(ClientShipmentPermissions);
export const ClientTransactionPermissionsD = Object.values(ClientTransactionPermissions);
export const ClientDesksPermissionsD = Object.values(ClientDesksPermissions);
