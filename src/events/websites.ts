import { EventEmitter } from 'node:events';

import type { Types } from 'mongoose';
interface WebsitesManagerServiceEvents {
	websiteCreated: [website: WebSiteDocumentI<Types.ObjectId, NativeDate>];
	websiteUpdated: [website: WebSiteDocumentI<Types.ObjectId, NativeDate>];
	websiteDeleted: [websiteId: string | Types.ObjectId];
}
export const websitesEmitter = new EventEmitter<WebsitesManagerServiceEvents>();
