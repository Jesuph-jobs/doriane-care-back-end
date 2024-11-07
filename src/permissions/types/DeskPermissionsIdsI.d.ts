declare type DeskGlobalPermissionsIdsI = 'desk:all' | 'desk:view';
declare type DeskManagementPermissionsIdsI = 'desk:create' | 'desk:edit' | 'desk:archive';
declare type DeskWorkersPermissionsIdsI = 'desk:view_workers' | 'desk:add_workers' | 'desk:remove_workers';
declare type DeskActionsPermissionsIdsI =
	/* desks */
	'desk:generate_desks_excel' | 'desk:assign_responsible';
declare type DeskPermissionsIdsI =
	| DeskGlobalPermissionsIdsI
	| DeskManagementPermissionsIdsI
	| DeskWorkersPermissionsIdsI
	| DeskActionsPermissionsIdsI;
