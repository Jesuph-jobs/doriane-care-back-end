declare type AdsGlobalPermissionsIdsI = 'ads:all' | 'ads:view';
declare type AdsManagementPermissionsIdsI = 'ads:create' | 'ads:edit' | 'ads:archive' | 'ads:delete';
declare type AdsActionsPermissionsIdsI = 'ads:notify';

declare type AdsPermissionsIdsI = AdsGlobalPermissionsIdsI | AdsManagementPermissionsIdsI | AdsActionsPermissionsIdsI;
