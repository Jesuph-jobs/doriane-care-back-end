import { EventEmitter } from 'node:events';
import type { Types } from 'mongoose';
interface RolesManagerServiceEvents {
	roleCreated: [role: RoleDocumentI<Types.ObjectId>];
	roleUpdated: [role: RoleDocumentI<Types.ObjectId>];
	roleDeleted: [roleId: string | Types.ObjectId];
}
export const rolesEmitter = new EventEmitter<RolesManagerServiceEvents>();
