declare type RolesGlobalPermissionsIdsI = 'role:all' | 'role:view';
declare type RolesManagementPermissionsIdsI = 'role:create' | 'role:edit' | 'role:delete';
declare type RolesActionsPermissionsIdsI = 'role:assign';
declare type RolesGlobalManagementIdsI = 'role:view_global' | 'role:assign_global' | 'role:edit_global';
declare type RolesPermissionsIdsI =
	/* roles */
	| RolesGlobalPermissionsIdsI
	| RolesManagementPermissionsIdsI
	| RolesActionsPermissionsIdsI
	| RolesGlobalManagementIdsI;
