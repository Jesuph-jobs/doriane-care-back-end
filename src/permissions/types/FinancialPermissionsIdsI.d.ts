declare type FinancialGlobalPermissionsIdsI = 'financial:all' | 'financial:view';
declare type FinancialActionsPermissionsIdsI = 'financial:adjust';
declare type FinancialReportsPermissionsIdsI =
	| 'financial:reports_view'
	| 'financial:reports_view_global'
	| 'financial:reports_export';
declare type FinancialPermissionsIdsI =
	/* financial */
	FinancialGlobalPermissionsIdsI | FinancialActionsPermissionsIdsI | FinancialReportsPermissionsIdsI;
