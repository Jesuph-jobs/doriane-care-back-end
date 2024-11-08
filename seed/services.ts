import MongoDBService from '@server/services/MongoDB';

export const mongoDBServiceSeed = new MongoDBService();

const seedServices: Promise<unknown>[] = [mongoDBServiceSeed.Connection];
export default seedServices;
