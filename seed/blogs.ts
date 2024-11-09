import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import blogModel from '#common/Blog';

const blog = (categoryID: Types.ObjectId): BlogI<Types.ObjectId> => ({
	author: {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		note: faker.lorem.paragraph(),
	},
	name: faker.animal.dog(),
	content: faker.lorem.paragraph(),
	description: faker.lorem.paragraph(),
	slug: faker.lorem.slug(),
	category: categoryID,
	tags: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
	meta: {
		keywords: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
		summery: faker.lorem.paragraph(),
		imageIndex: -1,
	},
	ratingAggregation: {
		average: faker.number.int({ min: 1, max: 5 }),
		count: faker.number.int({ min: 1, max: 100 }),
		distribution: [
			faker.number.int({ min: 1, max: 100 }),
			faker.number.int({ min: 1, max: 100 }),
			faker.number.int({ min: 1, max: 100 }),
			faker.number.int({ min: 1, max: 100 }),
			faker.number.int({ min: 1, max: 100 }),
		],
	},
	views: faker.number.int({ min: 1, max: 100 }),
	website: new Types.ObjectId('672e626d22d00e6bfea3821d'),
	enabled: true,
});

export async function seedBlog(categoryID: Types.ObjectId) {
	const websiteDoc = await blogModel.create(blog(categoryID));
	console.log({ websiteDoc });
}
