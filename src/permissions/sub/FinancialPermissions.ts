export const FinancialGlobalPermissions: Record<FinancialGlobalPermissionsIdsI, PermissionsI> = {
	'financial:all': {
		id: 'financial:all',
		name: 'Financial All',
		description: 'Financial All',
		requires: ['financial:view', 'financial:adjust'],
	},
	'financial:view': {
		id: 'financial:view',
		name: 'Financial View',
		description: 'Financial View',
		requires: [],
	},
};
export const FinancialActionsPermissions: Record<FinancialActionsPermissionsIdsI, PermissionsI> = {
	'financial:adjust': {
		id: 'financial:adjust',
		name: 'Financial Adjust',
		description: 'Financial Adjust',
		requires: ['financial:view'],
	},
};
export const FinancialReportsPermissions: Record<FinancialReportsPermissionsIdsI, PermissionsI> = {
	'financial:reports_view': {
		id: 'financial:reports_view',
		name: 'Financial Reports View',
		description: 'Financial Reports View',
		requires: ['financial:view'],
	},
	'financial:reports_export': {
		id: 'financial:reports_export',
		name: 'Financial Reports Export',
		description: 'Financial Reports Export',
		requires: ['financial:reports_view'],
	},
	'financial:reports_view_global': {
		id: 'financial:reports_view_global',
		name: 'Financial Reports View Global',
		description: 'Financial Reports View Global',
		requires: ['financial:reports_view'],
	},
};

export const FinancialPermissions: Record<FinancialPermissionsIdsI, PermissionsI> = {
	// Financial Permissions:
	...FinancialGlobalPermissions,
	...FinancialReportsPermissions,
	...FinancialActionsPermissions,
};
export const FinancialPermissionsD = Object.values(FinancialPermissions);
export const FinancialGlobalPermissionsD = Object.values(FinancialGlobalPermissions);
export const FinancialActionsPermissionsD = Object.values(FinancialActionsPermissions);
export const FinancialReportsPermissionsD = Object.values(FinancialReportsPermissions);
