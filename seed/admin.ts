import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import userModel from '#common/user';
export const admins = [
	new Types.ObjectId('6733ad5b0373b32bf81c5f1f'), // main one
];
const user = (roles: Types.ObjectId[]): Omit<UserDocumentI<Types.ObjectId>, 'apps' | 'lastLogin' | 'enabled'> => {
	const personalInformation: PersonalInformationI = {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		birthday: faker.date.birthdate().toISOString(),
		honorific: faker.person.prefix() as HonorificsTypes,
		note: faker.person.bio(),
	};
	const email = faker.internet.email({
		firstName: personalInformation.firstName,
		lastName: personalInformation.lastName,
		allowSpecialCharacters: true,
		provider: 'fy.dz',
	});
	console.log({ email });
	const phone = faker.phone.number();
	return {
		email,
		password: faker.internet.password(),
		phone,
		personalInformation,
		profilePicture: faker.image.avatar(),
		contactInformation: {
			phones: [{ number: phone }],
			emails: [email],
			validatedEmails: [email],
			socialMediaUrls: {},
		},
		roles,
	};
};

export async function seedUsers(roles: Types.ObjectId[]) {
	const admin = user(roles);
	await userModel.create(admin);
	return admin;
}

export async function getRandomUsersIds(size: number) {
	return (await userModel.aggregate().sample(size).project({ _id: 1 }).exec()).map(el => el._id);
}
