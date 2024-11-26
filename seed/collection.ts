import { faker } from '@faker-js/faker';
import type { Types } from 'mongoose';
import collectionModel from '#common/Collection';
import { getRandomBlogsIds } from './blogs';
import { getRandomProductsIds } from './seedProducts';
import { toLanguagesContent } from './utils';

const collection = (
	website: Types.ObjectId,
	publishables: Types.ObjectId[],
	forC: PublishableContentTypeI = 'b'
): CollectionI<Types.ObjectId> => ({
	name: toLanguagesContent(faker.lorem.sentence()),
	summary: toLanguagesContent(faker.lorem.paragraph()),
	slug: faker.lorem.slug(),
	tags: [faker.lorem.slug(), faker.lorem.slug(), faker.lorem.slug()],

	website,
	enabled: true,
	for: forC,
	isPublic: true,
	publishables,
	cover: {
		src: faker.image.url({ width: 850, height: 315 }),
		alt: faker.lorem.slug(),
		height: 315,
		width: 850,
	},
	avatar: {
		src: `https://robohash.org/${faker.internet.username()}.png`,
		alt: faker.lorem.slug(),
		height: 300,
		width: 300,
	},
});

export async function seedCollection(
	website: Types.ObjectId,
	publishables: Types.ObjectId[],
	forC: PublishableContentTypeI = 'b'
) {
	return collectionModel.create(collection(website, publishables, forC));
}
export async function seedCollectionsWithPublishable(website: Types.ObjectId, forC: PublishableContentTypeI = 'p') {
	await Promise.all(
		Array.from({ length: 15 }).map(async () => {
			//return seedCategory('p');
			const numberOfProducts = faker.number.int({ min: 10, max: 40 });
			return forC === 'p'
				? getRandomProductsIds(website, numberOfProducts)
				: getRandomBlogsIds(website, numberOfProducts);
		})
	).then(pubs => {
		return Promise.all(
			pubs.map(async pubs => {
				return seedCollection(website, pubs, forC);
			})
		);
	});
}
