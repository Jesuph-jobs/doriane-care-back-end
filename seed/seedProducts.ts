import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import productModel from '#common/Product';

const product = (categoryID: Types.ObjectId): ProductI<Types.ObjectId> => {
	const price = faker.number.float({ min: 350, max: 1250, multipleOf: 0.333333 });
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
		website: new Types.ObjectId('672e626d22d00e6bfea3821d'),
		enabled: true,
		additional: {
			benefits: faker.lorem.paragraph(),
			ingredients: faker.lorem.paragraph(),
			usage: faker.lorem.paragraph(),
			storageInstructions: faker.lorem.paragraph(),
		},
		createdBy: new Types.ObjectId(faker.database.mongodbObjectId()),
		flags: {
			comingSoon: false,
			preOrder: false,
		},
		images: [
			{
				src: faker.image.url(),
				alt: faker.lorem.slug(),
			},
			{
				src: faker.image.url(),
				alt: faker.lorem.slug(),
			},
			{
				src: faker.image.url(),
				alt: faker.lorem.slug(),
			},
		],
		pricing: {
			current: fixedPrice,
			original: fixedPrice - faker.number.int({ min: 0, max: fixedPrice / 2, multipleOf: 10 }),
		},
		sku: faker.commerce.product(),
		soldAggregation: {
			count: sold,
			delivered: (sold * faker.number.int({ min: 60, max: 99 })) / 100,
		},
	};
};

export async function seedProducts(categoryID: Types.ObjectId) {
	const websiteDoc = await productModel.create(product(categoryID));
	console.log({ websiteDoc });
}
