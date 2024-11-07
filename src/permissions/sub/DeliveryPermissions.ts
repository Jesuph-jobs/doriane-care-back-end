export const DeliveryManagementPermissions: Record<DeliveryManagementPermissionsIdsI, PermissionsI> = {
	'delivery:create': {
		id: 'delivery:create',
		name: 'Delivery Create',
		description: 'Delivery Create',
		requires: ['delivery:view'],
	},
	'delivery:enable': {
		id: 'delivery:enable',
		name: 'Delivery Enable',
		description: 'Delivery Enable',
		requires: ['delivery:view'],
	},
	'delivery:edit': {
		id: 'delivery:edit',
		name: 'Delivery Edit',
		description: 'Delivery Edit',
		requires: ['delivery:view'],
	},
	'delivery:edit_password': {
		id: 'delivery:edit_password',
		name: 'Delivery Edit Password',
		description: 'Delivery Edit Password',
		requires: ['delivery:view'],
	},
};
export const DeliveryAssignmentPermissions: Record<DeliveryAssignmentPermissionsIdsI, PermissionsI> = {
	'delivery:assign': {
		id: 'delivery:assign',
		name: 'Delivery Assign',
		description: 'Delivery Assign',
		requires: ['delivery:view'],
	},
	'delivery:unassign': {
		id: 'delivery:unassign',
		name: 'Delivery Unassign',
		description: 'Delivery Unassign',
		requires: ['delivery:view'],
	},
};
export const DeliveryGlobalPermissions: Record<DeliveryGlobalPermissionsIdsI, PermissionsI> = {
	'delivery:all': {
		id: 'delivery:all',
		name: 'Delivery All',
		description: 'Delivery All',
		requires: ['delivery:view', 'delivery:create', 'delivery:enable', 'delivery:edit'],
	},
	'delivery:view': {
		id: 'delivery:view',
		name: 'Delivery View',
		description: 'Delivery View',
		requires: [],
	},
};
export const DeliveryDesksPermissions: Record<DeliveryDesksPermissionsIdsI, PermissionsI> = {
	/* client addresses */
	'delivery:view_desks': {
		id: 'delivery:view_desks',
		name: 'Delivery View Desks',
		description: 'Delivery View Desks',
		requires: ['delivery:view'],
	},
	'delivery:assign_desk': {
		id: 'delivery:assign_desk',
		name: 'Delivery Assign Desk',
		description: 'Delivery Assign Desk',
		requires: ['delivery:view_desks'],
	},
	'delivery:unassign_desk': {
		id: 'delivery:unassign_desk',
		name: 'Delivery Unassign Desk',
		description: 'Delivery Unassign Desk',
		requires: ['delivery:view_desks'],
	},
};
export const DeliveryPermissions: Record<DeliveryPermissionsIdsI, PermissionsI> = {
	// Delivery man Permissions:
	...DeliveryGlobalPermissions,
	...DeliveryDesksPermissions,
	...DeliveryManagementPermissions,
	...DeliveryAssignmentPermissions,
};
export const DeliveryPermissionsD = Object.values(DeliveryPermissions);
export const DeliveryGlobalPermissionsD = Object.values(DeliveryGlobalPermissions);
export const DeliveryManagementPermissionsD = Object.values(DeliveryManagementPermissions);
export const DeliveryAssignmentPermissionsD = Object.values(DeliveryAssignmentPermissions);
export const DeliveryDesksPermissionsD = Object.values(DeliveryDesksPermissions);
