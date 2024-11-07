export const RolesGlobalPermissions: Record<RolesGlobalPermissionsIdsI, PermissionsI> = {
	'role:all': {
		id: 'role:all',
		name: 'Role All',
		description: 'Role All',
		requires: ['role:view', 'role:assign', 'role:create', 'role:edit', 'role:delete'],
	},
	'role:view': {
		id: 'role:view',
		name: 'Role View',
		description: 'Role View',
		requires: [],
	},
};
export const RolesManagementPermissions: Record<RolesManagementPermissionsIdsI, PermissionsI> = {
	'role:create': {
		id: 'role:create',
		name: 'Role Create',
		description: 'Role Create',
		requires: ['role:view'],
	},
	'role:edit': {
		id: 'role:edit',
		name: 'Role Edit',
		description: 'Role Edit',
		requires: ['role:view'],
	},
	'role:delete': {
		id: 'role:delete',
		name: 'Role Delete',
		description: 'Role Delete',
		requires: ['role:view'],
	},
};
export const RolesActionsPermissions: Record<RolesActionsPermissionsIdsI, PermissionsI> = {
	'role:assign': {
		id: 'role:assign',
		name: 'Role Assign',
		description: 'Role Assign',
		requires: ['role:view', 'admin:view'],
	},
};
export const RolesGlobalManagementPermissions: Record<RolesGlobalManagementIdsI, PermissionsI> = {
	'role:assign_global': {
		id: 'role:assign_global',
		name: 'Role Assign Global',
		description: 'Role Assign Global',
		requires: ['role:view_global'],
	},
	'role:view_global': {
		id: 'role:view_global',
		name: 'Role View Global',
		description: 'Role View Global',
		requires: [],
	},
	'role:edit_global': {
		id: 'role:edit_global',
		name: 'Role Edit Global',
		description: 'Role Edit Global',
		requires: ['role:view_global'],
	},
};
export const RolesPermissions: Record<RolesPermissionsIdsI, PermissionsI> = {
	//Roles Permissions:
	...RolesGlobalPermissions,
	...RolesManagementPermissions,
	...RolesActionsPermissions,
	...RolesGlobalManagementPermissions,
};
export const RolesPermissionsD = Object.values(RolesPermissions);
export const RolesGlobalPermissionsD = Object.values(RolesGlobalPermissions);
export const RolesManagementPermissionsD = Object.values(RolesManagementPermissions);
export const RolesActionsPermissionsD = Object.values(RolesActionsPermissions);
export const RolesGlobalManagementPermissionsD = Object.values(RolesGlobalManagementPermissions);
