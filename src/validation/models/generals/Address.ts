import { MyZodType, z } from '^server/defaultZod';
import { arraySchema } from '^server/elements';

export const AddressSchema = (
	{ province, city, addresses }: Partial<Record<keyof AddressI, ErrorsSchemaMsgI>> = {},
	DocumentUserMsg: ErrorsSchemaMsgI = {}
) => {
	return z
		.object<MyZodType<AddressI>>(
			{
				province: z
					.number(province)
					.gte(1, province?.small || 'province id must be at least 1')
					.max(58, province?.big || 'province id must be at most 58'),
				city: z
					.number(city)
					.gte(0, city?.small || 'city id must be at least 0')
					.max(100000, city?.big || 'city id must be at most 2000'),
				addresses: arraySchema(z.string(), addresses),
			},
			{
				description: DocumentUserMsg.description || 'Address document Schema',
				invalid_type_error: DocumentUserMsg.invalid || 'Invalid Address Schema',
				required_error: DocumentUserMsg.required || 'Address document Schema is required',
			}
		)
		.openapi('Address_document', { description: 'Address document Schema' });
};
