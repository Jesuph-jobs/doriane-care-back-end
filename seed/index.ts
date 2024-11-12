import mongoose from 'mongoose';
import { seedUsers } from './admin';
import { getRandomRoles } from './roles';
import seedServices from './services';
import { websites } from './website';

//const website = new Types.ObjectId('672e626d22d00e6bfea3821d');
async function seed() {
	console.time('server');
	await Promise.all(seedServices);
	console.timeEnd('server');

	mongoose.set('debug', false);

	console.time('seeding');
	//await seedWebsite();
	//seedCollectionsWithPublishable('b');
	//await Promise.all([seedRoles(undefined, 1, ['admin:super'])]);

	const roles = await Promise.all([getRandomRoles(), getRandomRoles(websites[0]), getRandomRoles(websites[1])]);
	const user = await seedUsers(roles.flat(1).map(r => r._id));
	console.log({ user });
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
