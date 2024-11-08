/* import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

import { cLogger } from '$server/console';

import { FY_CLOUDINARY_API_KEY, FY_CLOUDINARY_API_SECRET, FY_CLOUDINARY_CLOUD_NAME } from '&server/env';

import Service from './Service';
const id = 'CloudinaryService';
export default class CloudinaryService extends Service<void> {
	name = 'Cloudinary';
	category = 'Storage';
	description = 'Gestion du stockage Cloudinary';
	cloudinaryStorage: CloudinaryStorage | null = null;
	constructor(enabled: boolean = true) {
		super(id, enabled ? CloudinaryService.connect() : Promise.resolve());
		if (enabled)
			this.cloudinaryStorage = new CloudinaryStorage({
				cloudinary,
				params(_, file) {
					return {
						folder: 'accounts-uploads',
						allowed_formats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'tiff', 'bmp'],
						public_id: `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now().toString()}`,
					};
				},
			});
	}
	public static async connect() {
		cloudinary.config({
			cloud_name: FY_CLOUDINARY_CLOUD_NAME,
			api_key: FY_CLOUDINARY_API_KEY,
			api_secret: FY_CLOUDINARY_API_SECRET,
		});
		return CloudinaryService.checkConnection().then(() => {
			cLogger.info('☁️  Le service Cloudinary est activé');
		});
	}
	public static async checkConnection() {
		return cloudinary.api.ping();
	}
	public stop(): Promise<void> {
		return Promise.resolve();
	}
}
 */
