import { PermissionsIds } from '@common/permissions/Permissions';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Types } from 'mongoose';
import roleModel from '#common/Role';
import { rolesManagerService } from './services';
export const mainRole = new Types.ObjectId('6733948a43c3d1936a7cb948');
const role = (
	website: Types.ObjectId | undefined = undefined,
	containsPermissions: PermissionsIdsI[] = []
): RoleI<Types.ObjectId> => {
	return {
		name: faker.person.jobTitle(),
		description: faker.person.jobDescriptor(),
		permissions: [...containsPermissions, ..._.sampleSize(PermissionsIds, faker.number.int({ min: 1, max: 10 }))],
		website,
	};
};

export async function seedRoles(
	website: Types.ObjectId | undefined = undefined,
	size = 20,
	containsPermissions: PermissionsIdsI[] = []
) {
	return await Promise.all(
		Array.from({ length: size }).map(async () => {
			//return seedCategory('p');
			return roleModel.create(role(website, containsPermissions));
		})
	);
}

export async function getRandomRoles(website?: Types.ObjectId, size = 10) {
	return _.sampleSize(await rolesManagerService.getRoles(website), size);
}
