interface RoleI<ID = string, P = PermissionsIdsI> extends WebsiteLinkedI<ID> {
	name: string;
	permissions: P[];
	description: string;
}

declare interface RoleDocumentI<ID = string, P = PermissionsIdsI> extends RoleI<ID, P> {}
declare interface PublicRoleI<ID = string, P = PermissionsIdsI> extends RoleI<ID, P> {
	id: ID;
}
