import { ProductAdditionalEnums } from '@common/data/enums/ProductAdditionalEnums';
import { WebsiteFeaturesFlagsEnums } from '@common/data/enums/WebsiteFeaturesFlagsEnums';
import { Types } from 'mongoose';
import webSiteModel from '#common/WebSite';
export const websites = [
	new Types.ObjectId('672e626d22d00e6bfea3821d'), // main one
	new Types.ObjectId('67338cca1c3a192a4e349d14'),
];
const website: WebSiteI = {
	FY_ID: 'doriane-care-2',
	banners: [],
	services: [],
	testimonials: [],
	faqs: [],
	websiteInformation: {
		name: 'Doriane Care2',
		domain: 'doriane.care',
		description: 'Doriane Care',
		aboutUs: 'An e-commerce website called Doriane care',
		addresses: [
			{
				province: 19,
				city: 19,
				addresses: ['123 Main St'],
			},
		],
		contactInformation: {
			emails: ['doriane.care@gmail.com'],
			phones: [
				{
					number: '09123456789',
				},
			],
			websites: ['https://doriane.care'],
			socialMediaUrls: {
				facebook: 'https://facebook.com/doriane.care',
				x: 'https://twitter.com/doriane.care',
				instagram: 'https://instagram.com/doriane.care',
				youtube: 'https://youtube.com/doriane.care',
				linkedin: 'https://linkedin.com/doriane.care',
			},
		},
	},
	productsAttributes: ProductAdditionalEnums,
	flags: WebsiteFeaturesFlagsEnums,
	priceRange: {
		min: 0,
		max: 0,
	},
};

export async function seedWebsite() {
	const websiteDoc = await webSiteModel.create(website);
	console.log({ websiteDoc });
}
