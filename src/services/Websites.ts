import type { Types } from 'mongoose';

import { cLogger } from '$server/console';

import type { WebSettingsHydratedDocument } from '!common/generated/models/WebSite';
import websiteModel from '&common/WebSite';
import { websitesEmitter } from '@common/events/websites';
import { createDeferred } from '@server/utils/promises';
import Service from './Service';
/* events */

/* service details */
const id = 'WebsitesManagerService';

export default class WebsitesManagerService extends Service<WebSettingsHydratedDocument[]> {
	name = 'Websites Manager';
	category = 'Manager';
	description = 'Websites Manager Service';

	public websites = new Map<string, WebSettingsHydratedDocument>();

	constructor() {
		const { promise, resolve, reject } = createDeferred<WebSettingsHydratedDocument[]>();
		super(id, promise);
		this.loadWebsites()
			.then(r => {
				cLogger.info(`⚙️ Websites Manager has loaded ${r.length} websites`);
				resolve(r);
			})
			.catch(reject);
	}

	public async stop(): Promise<WebSettingsHydratedDocument[]> {
		return this.connection;
	}

	async loadWebsites(): Promise<WebSettingsHydratedDocument[]> {
		const allWebsites = await websiteModel.find();
		allWebsites.forEach(website => this.websites.set(website._id.toString(), website));
		return allWebsites;
	}
	async initialize(): Promise<WebSettingsHydratedDocument[]> {
		try {
			const websites = await this.loadWebsites();
			console.log('🍥 Websites loaded into memory.');
			// console.log(this.websites.values());
			// Listen for website events and update the websites in memory accordingly
			websitesEmitter.on('websiteCreated', (website: WebSettingsHydratedDocument) => {
				this.websites.set(website._id.toString(), website);
			});
			websitesEmitter.on('websiteUpdated', (website: WebSettingsHydratedDocument) => {
				this.websites.set(website._id.toString(), website);
			});
			websitesEmitter.on('websiteDeleted', websiteId => {
				const websiteIDstr = websiteId.toString();
				if (!this.websites.has(websiteIDstr))
					throw new Error(`Website with id ${websiteIDstr} not found in Website manager`);
				this.websites.delete(websiteIDstr);
			});
			return websites;
		} catch (err) {
			this.websites.clear();
			cLogger.error('⚠️ Websites Manager failed to load websites into memory.');
			throw err;
		}
	}
	getBasicWebsites(websiteIds: (string | Types.ObjectId)[]): Map<string, BasicWebSiteI> {
		const map = new Map<string, BasicWebSiteI>();
		websiteIds
			.map(websiteId => {
				const website = this.websites.get(websiteId.toString());
				if (!website) {
					cLogger.error(`Website with id ${websiteId} not found in Website manager`);
					return null;
				}
				return toBasicWebSite(website);
			})
			.filter(website => website !== null)
			.forEach(website => {
				map.set(website._id.toString(), website);
			});
		return map;
	}
	getWebsite(websiteId: string | Types.ObjectId): WebSettingsHydratedDocument | undefined {
		return this.websites.get(websiteId.toString());
	}
}
function toBasicWebSite(website: WebSettingsHydratedDocument): BasicWebSiteI {
	return {
		_id: website._id.toString(),
		FY_ID: website.FY_ID,
		name: website.websiteInformation.name,
		domain: website.websiteInformation.domain,
		flags: website.flags,
		productsAttributes: website.productsAttributes,
	};
}
