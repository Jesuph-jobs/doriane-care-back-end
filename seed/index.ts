import { seedBlog } from './blogs';
import { seedCategory } from './categories';
import seedServices from './services';

async function seed() {
	await Promise.all(seedServices);
	//await seedWebsite();
	const categories = await Promise.all(
		Array.from({ length: 10 }).map(async () => {
			//return seedCategory('p');
			return seedCategory('b');
		})
	);
	await Promise.all(
		categories.map(async cat => {
			return Promise.all(
				Array.from({ length: 10 }).map(async () => {
					//return seedProducts(cat._id);
					return seedBlog(cat._id);
				})
			);
		})
	);
	/* console.time('seed');

	const v = await blogModel.fuzzySearch('abbas');
	console.log({ v, length: v.length });
	console.timeEnd('seed'); */
}

seed();
