export const MoneyCollectionGlobalPermissions: Record<MoneyCollectionGlobalPermissionsIdsI, PermissionsI> = {
	'money_collection:all': {
		id: 'money_collection:all',
		name: 'Money Collection All',
		description: 'Money Collection All',
		requires: [
			'money_collection:view_one',
			'money_collection:view_sent',
			'money_collection:view_received',
			'money_collection:view_to_be_received',
			'money_collection:create',
			'money_collection:validate',
		],
	},
};
export const MoneyCollectionAccessPermissions: Record<MoneyCollectionAccessPermissionsIdsI, PermissionsI> = {
	'money_collection:view_one': {
		id: 'money_collection:view_one',
		name: 'Money Collection View One',
		description: 'Money Collection View One',
		requires: [],
	},
	'money_collection:view_sent': {
		id: 'money_collection:view_sent',
		name: 'Money Collection View Sent',
		description: 'Money Collection View Sent',
		requires: ['money_collection:view_one'],
	},
	'money_collection:view_received': {
		id: 'money_collection:view_received',
		name: 'Money Collection View Received',
		description: 'Money Collection View Received',
		requires: ['money_collection:view_one'],
	},
	'money_collection:view_to_be_received': {
		id: 'money_collection:view_to_be_received',
		name: 'Money Collection View To Be Received',
		description: 'Money Collection View To Be Received',
		requires: ['money_collection:view_one'],
	},
};
export const MoneyCollectionActionPermissions: Record<MoneyCollectionActionsPermissionsIdsI, PermissionsI> = {
	'money_collection:create': {
		id: 'money_collection:create',
		name: 'Money Collection Create',
		description: 'Money Collection Create',
		requires: ['money_collection:view_one'],
	},
	'money_collection:validate': {
		id: 'money_collection:validate',
		name: 'Money Collection Validate',
		description: 'Money Collection Validate',
		requires: ['money_collection:view_one'],
	},
};
export const MoneyCollectionPermissions: Record<MoneyCollectionPermissionsIdsI, PermissionsI> = {
	...MoneyCollectionGlobalPermissions,
	...MoneyCollectionAccessPermissions,
	...MoneyCollectionActionPermissions,
};
export const MoneyCollectionPermissionsD = Object.values(MoneyCollectionPermissions);
export const MoneyCollectionGlobalPermissionsD = Object.values(MoneyCollectionGlobalPermissions);
export const MoneyCollectionAccessPermissionsD = Object.values(MoneyCollectionAccessPermissions);
export const MoneyCollectionActionPermissionsD = Object.values(MoneyCollectionActionPermissions);
