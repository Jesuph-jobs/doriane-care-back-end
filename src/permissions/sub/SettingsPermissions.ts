export const SettingsPermissions: Record<SettingsPermissionsIdsI, PermissionsI> = {
	//Dashboard Permissions:

	'settings:view': {
		id: 'settings:view',
		name: 'Settings View',
		description: 'Settings View',
		requires: [],
	},
	'settings:edit_label': {
		id: 'settings:edit_label',
		name: 'Settings Edit Label',
		description: 'Settings Edit Label',
		requires: ['settings:view'],
	},
	'settings:edit_landing': {
		id: 'settings:edit_landing',
		name: 'Settings Edit Landing',
		description: 'Settings Edit Landing',
		requires: ['settings:view'],
	},
};
export const SettingsPermissionsD = Object.values(SettingsPermissions);
