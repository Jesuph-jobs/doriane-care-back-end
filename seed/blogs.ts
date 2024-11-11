import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import blogModel from '#common/Blog';

const blog = (categoryID: Types.ObjectId): BlogI<Types.ObjectId> => {
	const distribution = [
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
	] as BlogI['ratingAggregation']['distribution'];
	const rateCount = distribution.reduce((a, b) => a + b, 0);
	return {
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
			average: distribution.reduce((a, b, rate) => a + b * (rate + 1), 0) / rateCount,
			count: rateCount,
			distribution,
		},
		views: faker.number.int({ min: 1, max: 100 }),
		website: new Types.ObjectId('672e626d22d00e6bfea3821d'),
		enabled: true,
		cover: {
			src: faker.image.url({ width: 850, height: 315 }),
			alt: faker.lorem.slug(),
			height: 315,
			width: 850,
		},
	};
};

export async function seedBlog(categoryID: Types.ObjectId) {
	return blogModel.create(blog(categoryID));
}
export async function getRandomBlogsIds(size: number) {
	return (await blogModel.aggregate().sample(size).project({ _id: 1 }).exec()).map(el => el._id);
}
