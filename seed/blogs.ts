import blogModel from '&common/Blog';
import { faker } from '@faker-js/faker';
import type { Types } from 'mongoose';
import { admins } from './admin';
import { toLanguagesContent } from './utils';

const blog = (website: Types.ObjectId, categoryID: Types.ObjectId): BlogI<Types.ObjectId> => {
	const distribution = [
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
		faker.number.int({ min: 1, max: 100 }),
	] as BlogI['ratingAggregation']['distribution'];
	const rateCount = distribution.reduce((a, b) => a + b, 0);
	return {
		isPublished: Math.random() > 0.5,
		author: {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			note: faker.lorem.paragraph(),
		},
		name: toLanguagesContent(faker.animal.dog()),
		content: toLanguagesContent(faker.lorem.paragraph()),
		summary: toLanguagesContent(faker.lorem.paragraph()),
		slug: faker.lorem.slug(),
		category: categoryID,
		createdBy: admins[0],
		tags: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
		ratingAggregation: {
			average: distribution.reduce((a, b, rate) => a + b * (rate + 1), 0) / rateCount,
			count: rateCount,
			distribution,
		},
		views: faker.number.int({ min: 1, max: 100 }),
		website,
		enabled: true,
		cover: {
			src: faker.image.url({ width: 850, height: 315 }),
			alt: faker.lorem.slug(),
			height: 315,
			width: 850,
		},
		thumbnail: {
			src: faker.image.urlPicsumPhotos({
				width: 350,
				height: 350,
				blur: 0,
			}),
			height: 350,
			width: 350,
			alt: faker.lorem.slug(),
		},
	};
};

export async function seedBlog(website: Types.ObjectId, categoryID: Types.ObjectId) {
	return blogModel.create(blog(website, categoryID));
}
export async function getRandomBlogsIds(website: Types.ObjectId, size: number) {
	return (
		await blogModel
			.aggregate([
				{
					$match: {
						website,
					},
				},
			])
			.sample(size)
			.project({ _id: 1 })
			.exec()
	).map(el => el._id);
}
