import type { Types } from 'mongoose';

import { cLogger } from '$server/console';

import { rolesEmitter } from '@common/events/roles';
import { createDeferred } from '@server/utils/promises';
import roleModel from '#common/Role';
import { websitesManagerService } from '.';
import Service from './Service';
/* events */

/* service details */
const id = 'RolesManagerService';

export default class RolesManagerService extends Service<RoleDocumentI<Types.ObjectId>[]> {
	name = 'Roles Manager';
	category = 'Manager';
	description = 'Roles Manager Service';

	public roles = new Map<string, RoleDocumentI<Types.ObjectId>>();

	constructor() {
		const { promise, resolve, reject } = createDeferred<RoleDocumentI<Types.ObjectId>[]>();
		super(id, promise);
		this.loadRoles()
			.then(r => {
				cLogger.info(`👮 Roles Manager has loaded ${r.length} roles`);
				resolve(r);
			})
			.catch(reject);
	}

	public async stop(): Promise<RoleDocumentI<Types.ObjectId>[]> {
		return this.connection;
	}

	async loadRoles(): Promise<RoleDocumentI<Types.ObjectId>[]> {
		const allRoles = await roleModel.find().lean();
		allRoles.forEach(role => this.roles.set(role._id.toString(), role));
		return allRoles;
	}
	async initialize(): Promise<RoleDocumentI<Types.ObjectId>[]> {
		try {
			const roles = await this.loadRoles();
			console.log('🍥 Roles loaded into memory.');
			// console.log(this.roles.values());
			// Listen for role events and update the roles in memory accordingly
			rolesEmitter.on('roleCreated', (role: RoleDocumentI<Types.ObjectId>) => {
				this.roles.set(role._id.toString(), role);
			});
			rolesEmitter.on('roleUpdated', (role: RoleDocumentI<Types.ObjectId>) => {
				this.roles.set(role._id.toString(), role);
			});
			rolesEmitter.on('roleDeleted', roleId => {
				const roleIDstr = roleId.toString();
				if (!this.roles.has(roleIDstr)) throw new Error(`Role with id ${roleIDstr} not found in Role manager`);
				this.roles.delete(roleIDstr);
			});
			return roles;
		} catch (err) {
			this.roles.clear();
			cLogger.error('⚠️ Roles Manager failed to load roles into memory.');
			throw err;
		}
	}

	rolesHavePermission(rolesId: (string | Types.ObjectId)[], permissions: PermissionsIdsI[]): boolean {
		if (!rolesId.length) return false;
		return rolesId.some(roleId => this.roleHasPermission(roleId.toString(), permissions));
	}
	roleHasPermission(roleId: string, permissions: PermissionsIdsI[]): boolean {
		const role = this.roles.get(roleId);
		if (!role) throw new Error(`Role with id ${roleId} not found`);
		if (role.permissions.some(perm => perm === 'admin:super')) return true;
		return permissions.some(permission => role.permissions.some(perm => perm === permission));
	}
	getRoles(website?: Types.ObjectId): RoleDocumentI<Types.ObjectId>[] {
		return Array.from(this.roles.values()).filter(role => {
			if (!website) return !role.website;
			return role.website?.toString() === website.toString();
		});
	}
	getWebsitePermissions(rolesID: (Types.ObjectId | string)[]): WebSitePermissionsI<BasicWebSiteI>[] {
		const roles: RoleDocumentI<Types.ObjectId>[] = rolesID
			.map(roleID => {
				const role = this.roles.get(roleID.toString());
				if (!role) {
					cLogger.error(`Role with id ${roleID} not found`);
					return null;
				}
				return role;
			})
			.filter(role => role !== null);
		const websitesMap = websitesManagerService.getBasicWebsites(
			roles.map(role => role.website).filter(website => !!website)
		);

		const websites = websitesMap.values();

		return [
			{
				website: undefined,
				permissions: [...new Set(roles.filter(role => !role.website).flatMap(role => role.permissions))],
			},
			...websites.map(website => ({
				website,
				permissions: [
					...new Set(
						roles
							.filter(role => role.website?.toString() === website._id.toString())
							.flatMap(role => role.permissions)
					),
				],
			})),
		];
	}
}
