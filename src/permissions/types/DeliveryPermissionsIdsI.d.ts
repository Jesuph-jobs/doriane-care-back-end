declare type DeliveryGlobalPermissionsIdsI = 'delivery:all' | 'delivery:view';
declare type DeliveryAssignmentPermissionsIdsI = 'delivery:assign' | 'delivery:unassign';
declare type DeliveryDesksPermissionsIdsI =
	/* client addresses */
	'delivery:view_desks' | 'delivery:assign_desk' | 'delivery:unassign_desk';
declare type DeliveryManagementPermissionsIdsI =
	| 'delivery:create'
	| 'delivery:enable'
	| 'delivery:edit'
	| 'delivery:edit_password';
declare type DeliveryPermissionsIdsI =
	/* all delivery */
	| DeliveryGlobalPermissionsIdsI
	| DeliveryDesksPermissionsIdsI
	| DeliveryAssignmentPermissionsIdsI
	| DeliveryManagementPermissionsIdsI;
