import IORedis, { type RedisOptions } from 'ioredis';

import { cLogger } from '$server/console';

// import { fLogger } from '$server/file';
import { FY_REDIS_DB_HOST, FY_REDIS_DB_PASSWORD, FY_REDIS_DB_PORT } from '&server/env';

const options: RedisOptions = {
	host: FY_REDIS_DB_HOST,
	port: FY_REDIS_DB_PORT,
	password: FY_REDIS_DB_PASSWORD,
	maxRetriesPerRequest: null,
};
const startTime = Date.now();
const redisConnection = new IORedis(options);

redisConnection.on('connect', () => {
	const endTime = Date.now();
	const duration = endTime - startTime;
	cLogger.info(`🗄️  Redis connected - connection established in ${duration}ms`);
});

redisConnection.on('error', error => {
	cLogger.error(`🗄️  Redis error ${error}`);
	// fLogger.error(`🗄️  Redis error ${error}`);
});

export default redisConnection;
