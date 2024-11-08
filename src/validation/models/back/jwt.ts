import { type MyZodType, z } from '../../../../common/validations/defaultZod';
import { mongoIDSchema } from '../../../../common/validations/elements';

export const APP_JWT_PayloadSchema = ({
	id,
	pk,
	issAt,
	issBy,
}: Partial<Record<keyof APP_JWT_Payload, ErrorsSchemaMsgI>> = {}) =>
	z.object<MyZodType<APP_JWT_Payload>>({
		id: mongoIDSchema(id),
		issAt: z.number({
			required_error: issAt?.required || 'issAt is required',
			invalid_type_error: issAt?.invalid || 'issAt must be a number',
			description: issAt?.description || 'The issue date of the token',
		}),
		pk: z.string({
			required_error: pk?.required || 'pk is required',
			invalid_type_error: pk?.invalid || 'pk must be a string',
			description: pk?.description || 'The public key of the user',
		}),
		issBy: z.string({
			required_error: issBy?.required || 'issBy is required',
			invalid_type_error: issBy?.invalid || 'issBy must be a string',
			description: issBy?.description || 'The issuer of the token',
		}),
	});
