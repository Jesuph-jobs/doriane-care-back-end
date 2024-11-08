import seedServices from './services';
import { seedWebsite } from './website';

async function seed() {
	await Promise.all(seedServices);
	await seedWebsite();
}

seed();
