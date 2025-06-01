import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';
import MongoDBService from '@server/services/MongoDB';
/* import RolesManagerService from '@server/services/Roles';
import WebsitesManagerService from '@server/services/Websites';
 */
/* export const websitesManagerService = new WebsitesManagerService();
export const rolesManagerService = new RolesManagerService(); */
export const mongoDBServiceSeed = new MongoDBService();
export const rl = readline.createInterface({ input, output });

const seedServices = [mongoDBServiceSeed /* , websitesManagerService, rolesManagerService */];
export default seedServices;
