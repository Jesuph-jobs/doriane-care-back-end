import { Types } from 'mongoose';

import { cLogger } from '$server/console';

import type { RoleHydratedDocument } from '!common/generated/models/Role';
import roleModel from '&common/Role';
import { FY_DEV_ROLE_ID } from '&server/env';
import { rolesEmitter } from '@common/events/roles';
import Service from '@common/services/Service';
import { createDeferred } from '@server/utils/promises';
import { websitesManagerService } from '.';
/* events */

/* service details */
const id = 'RolesManagerService';

export default class RolesManagerService extends Service<RoleHydratedDocument[]> {
	name = 'Roles Manager';
	category = 'Manager';
	description = 'Roles Manager Service';

	public roles = new Map<string, RoleHydratedDocument>();

	constructor() {
		const { promise, resolve, reject } = createDeferred<RoleHydratedDocument[]>();
		super(id, promise);
		this.ensureDefaultRoles()
			.then(() => this.loadRoles())
			.then(r => {
				cLogger.info(`👮 Roles Manager has loaded ${r.length} roles`);
				resolve(r);
			})
			.catch(reject);
	}

	public async stop(): Promise<RoleHydratedDocument[]> {
		return this.connection;
	}

	async loadRoles(): Promise<RoleHydratedDocument[]> {
		const allRoles = await roleModel.find();
		allRoles.forEach(role => this.roles.set(role._id.toString(), role));
		return allRoles;
	}
	async ensureDefaultRoles(): Promise<void> {
		// Check if the role with the static _id exists
		const existingDevRole = await roleModel.findById(FY_DEV_ROLE_ID);
		if (!existingDevRole) {
			const devRole: PublicRoleI<Types.ObjectId> = {
				_id: new Types.ObjectId(FY_DEV_ROLE_ID),
				name: 'Dev',
				permissions: ['dev:super', 'admin:super'],
				description: 'Developer role with super admin permissions.',
			};
			// Create the Dev role if it doesn't exist
			const newRole = new roleModel(devRole);
			await newRole.save();
			cLogger.info('✨ Created default Dev role with static ID and super permissions.');
		} else {
			cLogger.info('🛠️ Default Dev role with static ID already exists.');
		}
	}

	async initialize(): Promise<RoleHydratedDocument[]> {
		try {
			const roles = await this.loadRoles();
			console.log('🍥 Roles loaded into memory.');
			// console.log(this.roles.values());
			// Listen for role events and update the roles in memory accordingly
			rolesEmitter.on('roleCreated', (role: RoleHydratedDocument) => {
				this.roles.set(role._id.toString(), role);
			});
			rolesEmitter.on('roleUpdated', (role: RoleHydratedDocument) => {
				this.roles.set(role._id.toString(), role);
			});
			rolesEmitter.on('roleDeleted', roleId => {
				const roleIDstr = roleId.toString();
				if (!this.roles.has(roleIDstr))
					return cLogger.error(`Role with id ${roleIDstr} not found in Role manager`);
				this.roles.delete(roleIDstr);
				console.log(`Deleted role with id ${roleIDstr} from Role manager`);
			});
			return roles;
		} catch (err) {
			this.roles.clear();
			cLogger.error('⚠️ Roles Manager failed to load roles into memory.');
			throw err;
		}
	}

	rolesHavePermission(
		rolesId: (string | Types.ObjectId)[],
		permissions: PermissionsIdsI[],
		filter?: Types.ObjectId | null
	): boolean {
		if (!rolesId.length) return false;
		return rolesId.some(roleId => this.roleHasPermission(roleId.toString(), permissions, filter));
	}
	roleHasPermission(roleId: string, permissions: PermissionsIdsI[], filter?: Types.ObjectId | null): boolean {
		const role = this.roles.get(roleId);
		if (!role) {
			cLogger.error(`Role with id ${roleId} not found in Role manager`);
			return false;
		}
		if (role._id.equals(FY_DEV_ROLE_ID)) return true;
		if (filter === null) {
			// treating global permissions
			if (role.website) return false;
		} else if (filter) {
			if (!role.website || !filter.equals(role.website)) return false;
		}
		if (role.permissions.some(perm => perm === 'admin:super')) return true;
		return permissions.some(permission => role.permissions.some(perm => perm === permission));
	}
	getRoles(website?: Types.ObjectId): RoleHydratedDocument[] {
		return Array.from(this.roles.values()).filter(role => {
			if (!website) return role._id.equals(FY_DEV_ROLE_ID) ? false : !role.website;
			return role.website?.equals(website);
		});
	}
	getRolesByIds(roleIds: (Types.ObjectId | string)[], filter?: Types.ObjectId | null): RoleHydratedDocument[] {
		return roleIds
			.map(roleId => {
				return this.roles.get(roleId.toString());
			})
			.filter(role => {
				if (!role) return false;
				if (filter === null) {
					return !role.website;
				}
				if (!filter) return true;
				return filter.equals(role.website);
			}) as RoleHydratedDocument[];
	}

	getWebsitePermissions(rolesID: (Types.ObjectId | string)[]): WebSitePermissionsI<BasicWebSiteI>[] {
		const roles: RoleHydratedDocument[] = rolesID
			.map(roleID => {
				const role = this.roles.get(roleID.toString());
				if (!role) {
					cLogger.error(`Role with id ${roleID} not found in Role manager`);
					return null;
				}
				return role;
			})
			.filter(role => role !== null);
		let websitesMap: Map<string, BasicWebSiteI>;
		if (
			roles.some(
				role =>
					role._id.equals(FY_DEV_ROLE_ID) || role.permissions.some(permission => permission === 'admin:super')
			)
		) {
			websitesMap = websitesManagerService.getBasicWebsites(websitesManagerService.websites.keys().toArray());
		} else
			websitesMap = websitesManagerService.getBasicWebsites(
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
