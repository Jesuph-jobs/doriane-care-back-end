import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import categoryModel from '#common/Category';

const category = (forC: PublishableContentTypeI = 'b'): CategoryI<Types.ObjectId> => ({
	name: faker.lorem.sentence(),
	description: faker.lorem.paragraph(),
	slug: faker.lorem.slug(),
	tags: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
	meta: {
		keywords: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
		summery: faker.lorem.paragraph(),
		imageIndex: -1,
	},

	website: new Types.ObjectId('672e626d22d00e6bfea3821d'),
	enabled: true,
	for: forC,
});

export async function seedCategory(forC: PublishableContentTypeI = 'b') {
	const categoryDoc = await categoryModel.create(category(forC));
	return categoryDoc;
}
