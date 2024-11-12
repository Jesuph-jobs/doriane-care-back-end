import { faker } from '@faker-js/faker';
import type { Types } from 'mongoose';
import categoryModel from '#common/Category';
import { seedBlog } from './blogs';
import { seedProducts } from './seedProducts';

const category = (
	website: Types.ObjectId,
	forC: PublishableContentTypeI = 'b',
	parentCategory?: Types.ObjectId
): CategoryI<Types.ObjectId> => ({
	name: faker.lorem.sentence(),
	description: faker.lorem.paragraph(),
	slug: faker.lorem.slug(),
	tags: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
	meta: {
		keywords: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
		summery: faker.lorem.paragraph(),
		imageIndex: -1,
	},

	website,
	enabled: true,
	for: forC,
	parentCategory: parentCategory,
	image: {
		src: faker.image.url({ width: 850, height: 315 }),
		alt: faker.lorem.slug(),
		height: 315,
		width: 850,
	},
});

export async function seedCategory(
	website: Types.ObjectId,
	forC: PublishableContentTypeI = 'b',
	parentCategory?: Types.ObjectId
) {
	return categoryModel.create(category(website, forC, parentCategory));
}
export async function seedCategoriesWithPublishable(website: Types.ObjectId, forC: PublishableContentTypeI = 'p') {
	const categories = await Promise.all(
		Array.from({ length: 15 }).map(async () => {
			//return seedCategory('p');
			return seedCategory(website, forC);
		})
	);
	await Promise.all(
		categories.map(async cat => {
			return Promise.all([
				...Array.from({ length: 7 }).map(async () => {
					return forC === 'p' ? seedProducts(website, cat._id) : seedBlog(website, cat._id);
				}),
				...Array.from({ length: 6 }).map(async () => {
					//return seedCategory('p', cat._id).then(cat => {
					return seedCategory(website, forC, cat._id).then(cat => {
						return Promise.all(
							Array.from({ length: 7 }).map(async () => {
								return forC === 'p' ? seedProducts(website, cat._id) : seedBlog(website, cat._id);
							})
						);
					});
				}),
			]);
		})
	);
}
