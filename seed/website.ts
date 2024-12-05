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
		title: { en: faker.lorem.sentence(), fr: faker.lorem.sentence(), ar: faker.lorem.sentence() },
		description: { en: faker.lorem.paragraph(), fr: faker.lorem.paragraph(), ar: faker.lorem.paragraph() },
		image: { src: faker.image.avatar(), alt: faker.lorem.sentence(), width: 350, height: 350 },
	})),
	testimonials: Array.from({ length: 20 }, () => ({
		title: { en: faker.lorem.sentence(), fr: faker.lorem.sentence(), ar: faker.lorem.sentence() },
		description: { en: faker.lorem.paragraph(), fr: faker.lorem.paragraph(), ar: faker.lorem.paragraph() },
		image: { src: faker.image.avatar(), alt: faker.lorem.sentence(), width: 350, height: 350 },
		rating: faker.number.int({ min: 1, max: 5 }),
	})),
	faqs: Array.from({ length: 6 }, () => ({
		question: { en: faker.lorem.sentence(), fr: faker.lorem.sentence(), ar: faker.lorem.sentence() },
		answer: { en: faker.lorem.paragraph(), fr: faker.lorem.paragraph(), ar: faker.lorem.paragraph() },
	})),

	websiteInformation: {
		name: {
			en: 'Aquasoft',
			fr: 'Aquasoft',
			ar: 'Aquasoft',
		},
		domain: 'https://www.aquasoft-dz.com',
		description: {
			en: 'An e-commerce website called Aquasoft by Doriane care',
			fr: 'Un site e-commerce appelé Aquasoft par Doriane care',
			ar: 'موقع انترنت يسمى Aquasoft من قبل Doriane care',
		},
		aboutUs: {
			en: faker.lorem.paragraph(),
			fr: faker.lorem.paragraph(),
			ar: faker.lorem.paragraph(),
		},
		addresses: [
			{
				province: 19,
				city: 19,
				address: '123 Main St',
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
		keywords: ['e-commerce', 'website', 'aquasoft', 'doriane care'],
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
		daysToDeliver: faker.number.int({ min: 2, max: 3 }),
	},
	policies: {
		privacy: {
			rules: [
				{
					question: {
						en: 'What is your return policy?',
						fr: 'Quelle est votre politique de retour?',
						ar: 'ما هي سياسة الاسترداد الخاصة بك؟',
					},
					answer: {
						en: 'We accept returns within 30 days of purchase. Please contact us at support@example.com for more information.',
						fr: "Nous acceptons les retours dans les 30 jours suivant l'achat. Veuillez nous contacter à l'adresse support@example.com pour plus d'informations.",
						ar: 'نحن نقبل الاستردادات خلال 30 يومًا من الشراء. يرجى الاتصال بنا على البريد الإلكتروني support@example.com لمزيد من المعلومات.',
					},
				},
			],
			description: {
				en: 'We accept returns within 30 days of purchase. Please contact us at support@example.com for more information.',
				fr: "Nous acceptons les retours dans les 30 jours suivant l'achat. Veuillez nous contacter à l'adresse support@example.com pour plus d'informations.",
				ar: 'نحن نقبل الاستردادات خلال 30 يومًا من الشراء. يرجى الاتصال بنا على البريد الإلكتروني support@example.com لمزيد من المعلومات.',
			},
		},
	},
	mainCategories: [],
	productsLists: [],
	quickLinks: [
		{
			label: {
				en: 'Home',
				ar: 'الرئيسية',
				fr: 'Accueil',
			},
			href: '/home',
		},
		{
			label: {
				en: 'Benefits',
				ar: 'فوائد',
				fr: 'Bienfaits',
			},
			href: '/home#benefits',
		},
		{
			label: {
				en: 'Products',
				ar: 'المنتجات',
				fr: 'Produits',
			},
			href: '/products',
		},
		{
			label: {
				en: 'Tips',
				ar: 'نصائح',
				fr: 'Conseils',
			},
			href: '/blogs',
		},
		{
			label: {
				en: 'FAQs',
				ar: 'الأسئلة الشائعة',
				fr: 'FAQ',
			},
			href: '/home#faqs',
		},
		{
			label: {
				en: 'Contact',
				ar: 'تواصل معنا',
				fr: 'Contact',
			},
			href: '/home#contact',
		},
	],
};

export async function seedWebsite() {
	const websiteDoc = await webSiteModel.create(website);
	console.log({ websiteDoc });
}
