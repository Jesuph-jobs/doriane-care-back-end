import { type MyZodType, z } from '^common/defaultZod';
import { nameSchema, stringDateSchema } from '^common/elements';

import { AddressSchema } from './Address';
export const gendersMap: Record<GendersT, LanguagesContentI> = {
	M: {
		EN: 'Male',
		AR: 'ذكر',
		FR: 'Homme',
	},
	F: {
		EN: 'Female',
		AR: 'أنثى',
		FR: 'Femme',
	},
};
export const gendersMapToValue: Record<GendersNamesT, GendersT> = { Male: 'M', Female: 'F' };
export const gendersList = Object.keys(gendersMap) as unknown as MyEnum<GendersT>;
export const PersonalInformationSchema = (
	{
		birthday,
		firstName,
		gender,
		lastName,
		residence,
		note,
	}: Partial<Record<Exclude<keyof PersonalInformationI, 'birthplace' | 'residence'>, ErrorsSchemaMsgI>> & {
		residence?: Partial<Record<keyof AddressI, ErrorsSchemaMsgI>>;
	} = {},
	DocumentUserMsg: ErrorsSchemaMsgI = {}
) => {
	return z
		.object<MyZodType<PersonalInformationI>>(
			{
				firstName: nameSchema(firstName, 'firstName'),
				lastName: nameSchema(lastName, 'lastName'),
				birthday: stringDateSchema(birthday),
				residence: AddressSchema(residence),
				note: z.string(note),
				gender: z.enum<GendersT, MyEnum<GendersT>>(gendersList, gender), // <1>
			},
			{
				description: DocumentUserMsg.description || 'User document Schema',
				invalid_type_error: DocumentUserMsg.invalid || 'Invalid User Schema',
				required_error: DocumentUserMsg.required || 'User document Schema is required',
			}
		)
		.openapi('User_Document', { description: 'User document Schema' });
};
