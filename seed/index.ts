//import { loadCities, saveCities } from './cities';
//import { website } from './website';

import mongoose, { Types } from 'mongoose';
import { seedCategoriesWithPublishable } from './categories';
import seedServices from './services';

const website = new Types.ObjectId('674b7fb77bb4d56ad4b90d6b');
async function seed() {
	//const cities = await loadCities();
	//console.log(cities);
	//await saveCities(cities);
	//await writeJSONFile('./website.json', website);
	console.time('server');
	await Promise.all(seedServices);
	console.timeEnd('server');

	mongoose.set('debug', false);

	console.time('seeding');
	console.timeLog('seeding', 'started');
	//await seedWebsite();
	await Promise.all([
		//seedCollectionsWithPublishable(website, 'b'),
		seedCategoriesWithPublishable(website, 'b'),
		//seedCollectionsWithPublishable(website, 'p'),
		seedCategoriesWithPublishable(website, 'p'),
	]);
	//await Promise.all([seedRoles(undefined, 1, ['admin:super'])]);

	/* const roles = await Promise.all([getRandomRoles(), getRandomRoles(website), getRandomRoles(website)]);
	const user = await seedUsers(roles.flat(1).map(r => r._id));
	console.log({ user }); */
	console.timeLog('seeding', 'ended');
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
	process.exit(0);
}

seed();
