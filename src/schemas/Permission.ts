import { Schema } from 'mongoose';

import type {
	PermissionInstanceMethods,
	PermissionModel,
	PermissionQueryHelpers,
	PermissionSchemaOptions,
	PermissionStaticMethods,
	PermissionVirtual,
} from '../types/schemas/Permission';

/* --------------------- Schema --------------------- */
const PermissionSchema = new Schema<
	PermissionI,
	PermissionModel,
	PermissionInstanceMethods,
	PermissionQueryHelpers,
	PermissionVirtual,
	PermissionStaticMethods,
	PermissionSchemaOptions
>(
	{
		// schema here
	},
	{ timestamps: true }
);
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
/* PermissionSchema.pre('save', async function (next) {
	try {
	// hook here
		next();
	} catch (err) {
		next(err as Error);
	}
});
 */
/* --------------------- Methods ---------------------  */

/* --------------------- Exports ---------------------  */
export default PermissionSchema;
