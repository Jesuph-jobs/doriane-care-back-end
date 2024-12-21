import type { Types } from 'mongoose';

import { cLogger } from '$server/console';

import type { WebSettingsHydratedDocument } from '!common/generated/models/WebSite';
import websiteModel from '&common/WebSite';
import { websitesEmitter } from '@common/events/websites';
import Service from '@common/services/Service';
import { createDeferred } from '@server/utils/promises';
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
				return this.toBasicWebSite(website);
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
	async getWebsitesList(
		query: SortableQuerySearchI<WebSiteSortableFields> & { enabled?: boolean }
	): Promise<ListOf<PublicWebSiteI<Types.ObjectId>>> {
		await this.Connection;
		let websites = Array.from(this.websites.values()).map(website => website.toOptimizedObject());
		if (query.enabled !== undefined)
			websites = websites.filter(website =>
				(query.enabled as unknown as string) === 'true' ? website.enabled : !website.enabled
			);
		const total = websites.length;

		if (query.search) {
			const search = new RegExp(query.search, 'i');
			websites = websites.filter(website => {
				return (
					search.test(website.websiteInformation.name.en) ||
					search.test(website.websiteInformation.name.fr) ||
					search.test(website.websiteInformation.name.ar) ||
					search.test(website.websiteInformation.domain) ||
					search.test(website.FY_ID)
				);
			});
		}
		if (query.sort) {
			switch (query.sort) {
				case 'FY_ID': {
					websites = websites.sort((a, b) => a.FY_ID.localeCompare(b.FY_ID));
					break;
				}
				case 'websiteInformation.name.en': {
					websites = websites.sort((a, b) =>
						a.websiteInformation.name.en.localeCompare(b.websiteInformation.name.en)
					);
					break;
				}
				case 'websiteInformation.name.fr': {
					websites = websites.sort((a, b) =>
						a.websiteInformation.name.fr.localeCompare(b.websiteInformation.name.fr)
					);
					break;
				}
				case 'websiteInformation.name.ar': {
					websites = websites.sort((a, b) =>
						a.websiteInformation.name.ar.localeCompare(b.websiteInformation.name.ar)
					);
					break;
				}
				case 'websiteInformation.domain': {
					websites = websites.sort((a, b) =>
						a.websiteInformation.domain.localeCompare(b.websiteInformation.domain)
					);
					break;
				}
				case 'createdAt': {
					websites = websites.sort(
						(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
					break;
				}
				default: {
					throw new Error(`Invalid sort field ${query.sort}`);
				}
			}
		}
		if (query.sortDir === 'desc') {
			websites = websites.reverse();
		}
		if (query.endDate || query.startDate) {
			websites = websites.filter(website => {
				const createdAt = new Date(website.createdAt).getTime();
				if (query.startDate && createdAt < Number(query.startDate)) return false;
				if (query.endDate && createdAt > Number(query.endDate)) return false;
				return true;
			});
		}

		if (query.limit) {
			const page = query.page ? Number(query.page) : 1;
			const offset = (page - 1) * Number(query.limit);
			websites = websites.slice(offset, query.limit);
		}

		return {
			total,
			list: websites,
		};
	}
	private toBasicWebSite(website: WebSettingsHydratedDocument): BasicWebSiteI {
		return {
			_id: website._id.toString(),
			FY_ID: website.FY_ID,
			name: website.websiteInformation.name,
			domain: website.websiteInformation.domain,
			flags: website.flags,
			productsAttributes: website.productsAttributes,
		};
	}
}
