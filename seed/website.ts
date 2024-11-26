import { ProductAdditionalEnums } from '@common/data/enums/ProductAdditionalEnums';
import { WebsiteFeaturesFlagsEnums } from '@common/data/enums/WebsiteFeaturesFlagsEnums';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import webSiteModel from '#common/WebSite';
export const websites = [
	new Types.ObjectId('672e626d22d00e6bfea3821d'), // main one
	new Types.ObjectId('67338cca1c3a192a4e349d14'),
];
export const website: WebSiteI = {
	FY_ID: 'doriane-care-2',
	banners: [],
	services: Array.from({ length: 4 }, () => ({
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		image: { src: faker.image.avatar(), alt: faker.lorem.sentence(), width: 350, height: 350 },
	})),
	testimonials: Array.from({ length: 12 }, () => ({
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		image: { src: faker.image.avatar(), alt: faker.lorem.sentence(), width: 350, height: 350 },
	})),
	faqs: Array.from({ length: 6 }, () => ({
		question: faker.lorem.sentence(),
		answer: faker.lorem.paragraph(),
	})),

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
		min: 350,
		max: 1250,
	},
	deliverySettings: {
		zones: Array.from({ length: 58 }, () => faker.number.int({ min: 1, max: 10 })),
		fees: Array.from({ length: 10 }, () => {
			const door = faker.number.int({ min: 300, max: 1400, multipleOf: 50 });
			return {
				door,
				desk: door - faker.number.int({ min: 100, max: 200, multipleOf: 50 }),
			};
		}),
		defaultFee: {
			desk: 150,
			door: 350,
		},
	},
};

export async function seedWebsite() {
	const websiteDoc = await webSiteModel.create(website);
	console.log({ websiteDoc });
}
