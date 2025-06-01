import '&server/env';
import mongoose from 'mongoose';
import seedServices from './services';

async function seed(func: () => void): Promise<void> {
	console.time('server');
	await Promise.all(seedServices.map(s => s.Connection));
	console.timeLog('server', 'ended');
	console.timeEnd('server');

	mongoose.set('debug', false);
	console.time('seeding');
	console.timeLog('seeding', 'started');
	await func();
	console.timeLog('seeding', 'ended');
	console.timeEnd('seeding');

	await Promise.all(seedServices.map(s => s.stop()));
	process.exit(0);
}

export default seed;
