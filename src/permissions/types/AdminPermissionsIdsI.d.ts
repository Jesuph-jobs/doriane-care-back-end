declare type AdminGlobalPermissionsIdsI = 'admin:all' | 'admin:view';
declare type AdminManagementPermissionsIdsI =
	| 'admin:create'
	| 'admin:enable'
	| 'admin:edit'
	| 'admin:assign_clients'
	| 'admin:edit_password';
declare type AdminDesksPermissionsIdsI =
	/* client addresses */
	'admin:view_desks' | 'admin:assign_desk' | 'admin:unassign_desk';
declare type AdminActivitiesPermissionsIdsI = 'admin:activity_logs';
declare type AdminPermissionsIdsI =
	/* admin */
	| AdminGlobalPermissionsIdsI
	| AdminDesksPermissionsIdsI
	| AdminManagementPermissionsIdsI
	| AdminActivitiesPermissionsIdsI;
