import MongoDBService from '@server/services/MongoDB';
//import RolesManagerService from '@server/services/Roles';

export const mongoDBServiceSeed = new MongoDBService();
//export const rolesManagerService = new RolesManagerService();

const seedServices = [mongoDBServiceSeed.Connection /* rolesManagerService.Connection */];
export default seedServices;
