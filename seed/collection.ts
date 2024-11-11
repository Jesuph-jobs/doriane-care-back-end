import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import collectionModel from '#common/Collection';
import { getRandomBlogsIds } from './blogs';
import { getRandomProductsIds } from './seedProducts';

const collection = (
	publishables: Types.ObjectId[],
	forC: PublishableContentTypeI = 'b'
): CollectionI<Types.ObjectId> => ({
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
	isPublic: true,
	publishables,
	cover: {
		src: faker.image.url({ width: 850, height: 315 }),
		alt: faker.lorem.slug(),
		height: 315,
		width: 850,
	},
});

export async function seedCollection(publishables: Types.ObjectId[], forC: PublishableContentTypeI = 'b') {
	return collectionModel.create(collection(publishables, forC));
}
export async function seedCollectionsWithPublishable(forC: PublishableContentTypeI = 'p') {
	await Promise.all(
		Array.from({ length: 15 }).map(async () => {
			//return seedCategory('p');
			const numberOfProducts = faker.number.int({ min: 10, max: 40 });
			return forC === 'p' ? getRandomProductsIds(numberOfProducts) : getRandomBlogsIds(numberOfProducts);
		})
	).then(pubs => {
		return Promise.all(
			pubs.map(async pubs => {
				return seedCollection(pubs, forC);
			})
		);
	});
}
