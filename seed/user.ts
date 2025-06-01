import seed from 'seed';

// separate imports for types

import roleModel from '&common/Role';
import userModel from '&common/user';
import { FY_DEV_ROLE_ID } from '&server/env';
import type { Types } from 'mongoose';
import { question } from './prompt';

seed(async () => {
	let personalInformation: PersonalInformationI;
	do {
		personalInformation = {
			firstName: await question('Enter first name:')!,
			lastName: await question('Enter last name:')!,
		};
	} while (!personalInformation.firstName || !personalInformation.lastName);
	let user: UserDocumentI<Types.ObjectId>;
	do {
		const email = await question('Enter email:')!;
		const password = await question('Enter password:')!;
		const phone = await question('Enter phone:')!;
		user = {
			email,
			password,
			phone,
			personalInformation,
			contactInformation: {
				phones: [phone],
				emails: [email],
				validatedEmails: [email],
				socialMediaUrls: {},
			},
			roles: [],
			enabled: true,
		};
	} while (!user.email || !user.password || !user.phone);

	const role = await roleModel.findById(FY_DEV_ROLE_ID).exec();
	if (role) {
		user.roles = [role._id];
	} else {
		console.warn('No roles found, user will not have any roles assigned.');
	}
	await userModel.create(user);
}).catch(err => {
	console.error('Seeding failed:', err);
	process.exit(1);
});
