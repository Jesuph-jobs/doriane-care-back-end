export const ShipmentGlobalPermissions: Record<ShipmentGlobalPermissionsIdsI, PermissionsI> = {
	'shipment:all': {
		id: 'shipment:all',
		name: 'Shipment All',
		description: 'Shipment All',
		requires: [
			'shipment:view',
			'shipment:assign',
			'shipment:create',
			'shipment:edit',
			'shipment:delete',
			'shipment:cancel',
		],
	},
	'shipment:view': {
		id: 'shipment:view',
		name: 'Shipment View',
		description: 'Shipment View',
		requires: [],
	},
	'shipment:view_pricing_details': {
		id: 'shipment:view_pricing_details',
		name: 'Shipment View Pricing Details',
		description: 'Shipment View Pricing Details',
		requires: ['shipment:view'],
	},
};
export const ShipmentReportPermissions: Record<ShipmentReportPermissionsIdsI, PermissionsI> = {
	'shipment:reports_view': {
		id: 'shipment:reports_view',
		name: 'Shipment Reports View',
		description: 'Shipment Reports View',
		requires: ['shipment:view'],
	},
	'shipment:reports_export': {
		id: 'shipment:reports_export',
		name: 'Shipment Reports Export',
		description: 'Shipment Reports Export',
		requires: ['shipment:view'],
	},
	'shipment:reports_view_global': {
		id: 'shipment:reports_view_global',
		name: 'Shipment Reports View Global',
		description: 'Shipment Reports View Global',
		requires: ['shipment:view'],
	},
};
export const ShipmentActionsPermissions: Record<ShipmentActionsPermissionsIdsI, PermissionsI> = {
	'shipment:assign_transit': {
		id: 'shipment:assign_transit',
		name: 'Shipment Assign Transit',
		description: 'Shipment Assign Transit',
		requires: ['shipment:view'],
	},
	'shipment:assign_return': {
		id: 'shipment:assign_return',
		name: 'Shipment Assign Return',
		description: 'Shipment Assign Return',
		requires: ['shipment:view'],
	},
	'shipment:cancel': {
		id: 'shipment:cancel',
		name: 'Shipment Cancel',
		description: 'Shipment Cancel',
		requires: ['shipment:view'],
	},
	'shipment:cancel_assignment': {
		id: 'shipment:cancel_assignment',
		name: 'Shipment Cancel Assignment',
		description: 'Shipment Cancel Assignment',
		requires: ['shipment:view'],
	},
	'shipment:prepare': {
		id: 'shipment:prepare',
		name: 'Shipment Prepare',
		description: 'Shipment Prepare',
		requires: ['shipment:view'],
	},
	'shipment:re_collect': {
		id: 'shipment:re_collect',
		name: 'Shipment Re Collect',
		description: 'Shipment Re Collect',
		requires: ['shipment:view'],
	},
	'shipment:confirm_collection': {
		id: 'shipment:confirm_collection',
		name: 'Shipment Confirm Collection',
		description: 'Shipment Confirm Collection',
		requires: ['shipment:view'],
	},
	'shipment:confirm_delivery': {
		id: 'shipment:confirm_delivery',
		name: 'Shipment Confirm Delivery',
		description: 'Shipment Confirm Delivery',
		requires: ['shipment:view'],
	},
	'shipment:confirm_return': {
		id: 'shipment:confirm_return',
		name: 'Shipment Confirm Return',
		description: 'Shipment Confirm Return',
		requires: ['shipment:view'],
	},
	'shipment:confirm_transited': {
		id: 'shipment:confirm_transited',
		name: 'Shipment Confirm Transited',
		description: 'Shipment Confirm Transited',
		requires: ['shipment:view'],
	},
	'shipment:confirm_arriving': {
		id: 'shipment:confirm_arriving',
		name: 'Shipment Confirm Arriving',
		description: 'Shipment Confirm Arriving',
		requires: ['shipment:view'],
	},
	'shipment:confirm_money_collection': {
		id: 'shipment:confirm_money_collection',
		name: 'Shipment Confirm Money Collection',
		description: 'Shipment Confirm Money Collection',
		requires: ['shipment:view'],
	},
	'shipment:assign': {
		id: 'shipment:assign',
		name: 'Shipment Assign',
		description: 'Shipment Assign',
		requires: ['shipment:view'],
	},
};
export const ShipmentManagementPermissions: Record<ShipmentManagementPermissionsIdsI, PermissionsI> = {
	'shipment:create': {
		id: 'shipment:create',
		name: 'Shipment Create',
		description: 'Shipment Create',
		requires: ['shipment:view'],
	},
	'shipment:edit': {
		id: 'shipment:edit',
		name: 'Shipment Edit',
		description: 'Shipment Edit',
		requires: ['shipment:view'],
	},

	'shipment:delete': {
		id: 'shipment:delete',
		name: 'Shipment Delete',
		description: 'Shipment Delete',
		requires: ['shipment:view'],
	},
	'shipment:get_label': {
		id: 'shipment:get_label',
		name: 'Shipment Get Label',
		description: 'Shipment Get Label',
		requires: ['shipment:view'],
	},
	'shipment:export': {
		id: 'shipment:export',
		name: 'Shipment Export',
		description: 'Shipment Export',
		requires: ['shipment:view'],
	},
};
export const ShipmentStatusPermissions: Record<ShipmentStatusPermissionsIdsI, PermissionsI> = {
	'shipment:view_coming': {
		id: 'shipment:view_coming',
		name: 'Shipment View Coming',
		description: 'Shipment View Coming',
		requires: ['shipment:view'],
	},
	'shipment:view_in_hold': {
		id: 'shipment:view_in_hold',
		name: 'Shipment View In Hold',
		description: 'Shipment View In Hold',
		requires: ['shipment:view'],
	},
	'shipment:view_canceled_in_hold': {
		id: 'shipment:view_canceled_in_hold',
		name: 'Shipment View Canceled In Hold',
		description: 'Shipment View Canceled In Hold',
		requires: ['shipment:view'],
	},
	'shipment:view_assigned': {
		id: 'shipment:view_assigned',
		name: 'Shipment View Assigned',
		description: 'Shipment View Assigned',
		requires: ['shipment:view'],
	},
	'shipment:view_assigned_in_transit': {
		id: 'shipment:view_assigned_in_transit',
		name: 'Shipment View Assigned In Transit',
		description: 'Shipment View Assigned In Transit',
		requires: ['shipment:view'],
	},
	'shipment:view_assigned_in_return': {
		id: 'shipment:view_assigned_in_return',
		name: 'Shipment View Assigned In Return',
		description: 'Shipment View Assigned In Return',
		requires: ['shipment:view'],
	},
	'shipment:view_in_transit': {
		id: 'shipment:view_in_transit',
		name: 'Shipment View In Transit',
		description: 'Shipment View In Transit',
		requires: ['shipment:view'],
	},
	'shipment:view_in_delivery': {
		id: 'shipment:view_in_delivery',
		name: 'Shipment View In Delivery',
		description: 'Shipment View In Delivery',
		requires: ['shipment:view'],
	},
	'shipment:view_in_return': {
		id: 'shipment:view_in_return',
		name: 'Shipment View In Return',
		description: 'Shipment View In Return',
		requires: ['shipment:view'],
	},
	'shipment:view_delivered': {
		id: 'shipment:view_delivered',
		name: 'Shipment View Delivered',
		description: 'Shipment View Delivered',
		requires: ['shipment:view'],
	},
	'shipment:view_money_collected': {
		id: 'shipment:view_money_collected',
		name: 'Shipment View Money Collected',
		description: 'Shipment View Money Collected',
		requires: ['shipment:view'],
	},
	'shipment:view_money_affected': {
		id: 'shipment:view_money_affected',
		name: 'Shipment View Money Affected',
		description: 'Shipment View Money Affected',
		requires: ['shipment:view'],
	},
	'shipment:view_returned': {
		id: 'shipment:view_returned',
		name: 'Shipment View Returned',
		description: 'Shipment View Returned',
		requires: ['shipment:view'],
	},
};
export const ShipmentPermissions: Record<ShipmentPermissionsIdsI, PermissionsI> = {
	//Shipment Permissions:
	...ShipmentGlobalPermissions,
	...ShipmentReportPermissions,
	...ShipmentActionsPermissions,
	...ShipmentManagementPermissions,
	...ShipmentStatusPermissions,
};
export const ShipmentPermissionsD = Object.values(ShipmentPermissions);
export const ShipmentGlobalPermissionsD = Object.values(ShipmentGlobalPermissions);
export const ShipmentActionsPermissionsD = Object.values(ShipmentActionsPermissions);
export const ShipmentManagementPermissionsD = Object.values(ShipmentManagementPermissions);
export const ShipmentStatusPermissionsD = Object.values(ShipmentStatusPermissions);
