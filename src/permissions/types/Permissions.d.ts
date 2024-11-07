declare interface PermissionsI {
	id: PermissionsIdsI;
	name: string;
	description: string;
	requires: PermissionsIdsI[];
}

declare type DashboardPermissionsIdsI = /* dashboard */ 'dashboard:view';
declare type SettingsPermissionsIdsI = /* settings */ 'settings:view' | 'settings:edit_label' | 'settings:edit_landing';
declare type TransactionsPermissionsIdsI = /* settings */ 'transactions:view_all';

declare type PermissionsIdsI =
	| 'admin:super'
	| AdsPermissionsIdsI
	| ClientPermissionsIdsI
	| DeliveryPermissionsIdsI
	| ShipmentPermissionsIdsI
	| ShipmentIssuesPermissionsIdsI
	| DeskPermissionsIdsI
	| FinancialPermissionsIdsI
	| AdminPermissionsIdsI
	| RolesPermissionsIdsI
	| MoneyCollectionPermissionsIdsI
	| TransactionsPermissionsIdsI
	| DashboardPermissionsIdsI
	| SettingsPermissionsIdsI;
