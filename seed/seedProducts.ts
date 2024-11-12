import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import productModel from '#common/Product';

const product = (website: Types.ObjectId, categoryID: Types.ObjectId): ProductI<Types.ObjectId> => {
	const price = faker.number.int({ min: 350, max: 1250, multipleOf: 50 });
	const fixedPrice = price - Math.floor(price) < 0.7 ? Math.floor(price) : price;
	const sold = faker.number.int({ min: 3, max: 120 });
	return {
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
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
		website,
		enabled: true,
		additional: {
			benefits: Array.from({ length: 10 }).map(() => ({
				title: faker.lorem.slug(),
				description: faker.lorem.paragraph(),
				image: faker.image.avatar(),
			})),
			ingredients: faker.lorem.paragraph(),
			usage: faker.lorem.paragraph(),
			storageInstructions: faker.lorem.paragraph(),
		},
		createdBy: new Types.ObjectId(faker.database.mongodbObjectId()),
		flags: {
			comingSoon: false,
			preOrder: false,
		},
		images: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }).map(() => ({
			src: faker.image.url({ width: 350, height: 350 }),
			alt: faker.lorem.slug(),
			width: 350,
			height: 350,
		})),
		pricing: {
			current: fixedPrice,
			original: fixedPrice + faker.number.int({ min: 0, max: (fixedPrice * 2) / 3, multipleOf: 10 }),
		},
		sku: faker.commerce.product(),
		soldAggregation: {
			count: sold,
			delivered: (sold * faker.number.int({ min: 60, max: 99 })) / 100,
		},
	};
};

export async function seedProducts(website: Types.ObjectId, categoryID: Types.ObjectId) {
	return productModel.create(product(website, categoryID));
}

export async function getRandomProductsIds(website: Types.ObjectId, size: number) {
	return (
		await productModel
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
