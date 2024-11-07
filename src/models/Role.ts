import { Schema, type Types, model } from 'mongoose';

import { PermissionsIds } from '@server/permissions/Permissions';
import type {
	RoleInstanceMethods,
	RoleModel,
	RoleQueryHelpers,
	RoleSchemaOptions,
	RoleStaticMethods,
	RoleVirtual,
} from '../types/models/Role';

const required = true;

/* --------------------- Schema --------------------- */
const RoleSchema = new Schema<
	RoleDocumentI<Types.ObjectId>,
	RoleModel,
	RoleInstanceMethods,
	RoleQueryHelpers,
	RoleVirtual,
	RoleStaticMethods,
	RoleSchemaOptions
>(
	{
		// schema here
		name: { type: String, required },
		description: { type: String, required },
		permissions: { type: [{ type: String, enum: PermissionsIds }], required },
		website: { type: Schema.Types.ObjectId, ref: 'Website', required },
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* RoleSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Query Helpers --------------------- */

/* --------------------- static methods --------------------- */

/* --------------------- Generate Model --------------------- */
const roleModel = model<RoleDocumentI<Types.ObjectId>, RoleModel, RoleQueryHelpers>('Role', RoleSchema);
export default roleModel;
