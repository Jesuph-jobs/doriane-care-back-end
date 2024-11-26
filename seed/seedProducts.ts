import { productLabelsEnums } from '@common/data/enums/generalEnums';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import type { Types } from 'mongoose';
import productModel from '#common/Product';
import { admins } from './admin';
import { toLanguagesContent } from './utils';

const product = (website: Types.ObjectId, categoryID: Types.ObjectId): ProductI<Types.ObjectId> => {
	const price = faker.number.int({ min: 350, max: 1250, multipleOf: 50 });
	const fixedPrice = price - Math.floor(price) < 0.7 ? Math.floor(price) : price;
	const sold = faker.number.int({ min: 3, max: 120 });
	return {
		name: toLanguagesContent(faker.commerce.productName()),
		description: toLanguagesContent(faker.commerce.productDescription()),
		summary: toLanguagesContent(faker.commerce.productDescription()),
		slug: faker.lorem.slug(),
		category: categoryID,
		tags: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],
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
				image: {
					src: faker.image.avatar(),
					alt: faker.lorem.slug(),
					width: 350,
					height: 350,
				},
			})),
			ingredients: faker.lorem.paragraph(),
			usage: faker.lorem.paragraph(),
			storageInstructions: faker.lorem.paragraph(),
		},
		createdBy: admins[0],
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
		thumbnail: {
			src: faker.image.url({ width: 350, height: 350 }),
			alt: faker.lorem.slug(),
			width: 350,
			height: 350,
		},
		label: _.sample(productLabelsEnums),
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
