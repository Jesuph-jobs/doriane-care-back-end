export const DashboardPermissions: Record<DashboardPermissionsIdsI, PermissionsI> = {
	//Dashboard Permissions:

	'dashboard:view': {
		id: 'dashboard:view',
		name: 'Dashboard View',
		description: 'Dashboard View',
		requires: [],
	},
};
export const DashboardPermissionsD = Object.values(DashboardPermissions);
