export const ShipmentIssuesGlobalPermissions: Record<ShipmentIssuesGlobalPermissionsIdsI, PermissionsI> = {
	'issue:all': {
		id: 'issue:all',
		name: 'Issue All',
		description: 'Issue All',
		requires: ['issue:view', 'issue:create', 'issue:resolve'],
	},
	'issue:view': {
		id: 'issue:view',
		name: 'Issue View',
		description: 'Issue View',
		requires: [],
	},
};
export const ShipmentIssuesManagementPermissions: Record<ShipmentIssuesManagementPermissionsIdsI, PermissionsI> = {
	'issue:create': {
		id: 'issue:create',
		name: 'Issue Create',
		description: 'Issue Create',
		requires: ['issue:view'],
	},
	'issue:resolve': {
		id: 'issue:resolve',
		name: 'Issue Resolve',
		description: 'Resolve an issue of a shipment',
		requires: ['issue:view'],
	},
};
export const ShipmentIssuesPermissions: Record<ShipmentIssuesPermissionsIdsI, PermissionsI> = {
	//Issue Permissions:
	...ShipmentIssuesGlobalPermissions,
	...ShipmentIssuesManagementPermissions,
};
export const ShipmentIssuesPermissionsD = Object.values(ShipmentIssuesPermissions);
export const ShipmentIssuesGlobalPermissionsD = Object.values(ShipmentIssuesGlobalPermissions);
export const ShipmentIssuesManagementPermissionsD = Object.values(ShipmentIssuesManagementPermissions);
