import mongoose from 'mongoose';
import { seedCollectionsWithPublishable } from './collection';
import seedServices from './services';

//const website = new Types.ObjectId('672e626d22d00e6bfea3821d');
async function seed() {
	console.time('server');
	await Promise.all(seedServices);
	console.timeEnd('server');
	console.time('seeding');
	mongoose.set('debug', false);
	//await seedWebsite();
	seedCollectionsWithPublishable('b');

	console.timeEnd('seeding');

	/* 	console.time('search');

	const v = await productModel
		.fuzzySearch('Soap')
		.find({ website })
		.sort({ 'pricing.current': -1 }, { override: true });

	console.log({ v, length: v.length });
	console.timeEnd('search'); */

	/* 	console.time('test');
	const [x, y, z] = await Promise.all([getRandomProductsIds(10), getRandomProductsIds(10), getRandomProductsIds(10)]);

	console.log({ x, y, z });
	console.timeEnd('test'); */
}

seed();
