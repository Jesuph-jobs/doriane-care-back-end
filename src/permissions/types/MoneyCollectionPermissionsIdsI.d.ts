declare type MoneyCollectionGlobalPermissionsIdsI = 'money_collection:all';
declare type MoneyCollectionActionsPermissionsIdsI = 'money_collection:create' | 'money_collection:validate';
declare type MoneyCollectionAccessPermissionsIdsI =
	| 'money_collection:view_one'
	| 'money_collection:view_sent'
	| 'money_collection:view_received'
	| 'money_collection:view_to_be_received';
declare type MoneyCollectionPermissionsIdsI =
	/* money collection */
	MoneyCollectionGlobalPermissionsIdsI | MoneyCollectionAccessPermissionsIdsI | MoneyCollectionActionsPermissionsIdsI;
