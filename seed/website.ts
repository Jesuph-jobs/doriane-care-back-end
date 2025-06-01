import seed from 'seed';

// separate imports for types

import webSiteModel from '&common/WebSite';
import { ProductAdditionalEnums } from '@common/data/enums/ProductAdditionalEnums';
import { WebsiteFeaturesFlagsEnums } from '@common/data/enums/WebsiteFeaturesFlagsEnums';
import { faker } from '@faker-js/faker';
import { question } from './prompt';

const website: () => Promise<WebSiteI> = async () => {
	let name: LanguagesContentI;
	do {
		name = {
			en: await question('Enter website name in English:')!,
			fr: await question('Enter website name in French:')!,
			ar: await question('Enter website name in Arabic:')!,
		};
	} while (!name.en || !name.fr || !name.ar);
	let domain: string;
	do {
		domain = await question('Enter website domain (e.g., https://www.example.com):')!;
		if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
			console.error('Domain must start with http:// or https://');
			domain = '';
		}
	} while (!domain || (!domain.startsWith('http://') && !domain.startsWith('https://')));
	while (domain.endsWith('/')) {
		domain = domain.slice(0, -1); // Remove trailing slash if present
	}
	const description = {
		en: `An e-commerce website called ${name.en} by Doriane care`,
		fr: `Un site e-commerce appelé ${name.fr} par Doriane care`,
		ar: `موقع انترنت يسمى ${name.ar} من قبل Doriane care`,
	};
	let contactInformation: ContactInformationI;
	do {
		contactInformation = {
			emails: [await question('Enter contact email:')!],
			phones: [await question('Enter contact phone:')!],
			websites: [],
			socialMediaUrls: {},
		};
	} while (!contactInformation.emails[0] || !contactInformation.phones[0]);
	return {
		FY_ID: (await question('Enter website ID:')) || 'NEW_WEBSITE',
		loyaltyProgram: {
			bonuses: {
				accountCreation: 0,
				newsletterSignup: 0,
			},
			conversionRate: 0.01,
			expirationOnMonths: 12,
			multipliers: {
				promotion: 2,
			},
			tiers: {
				bronze: {
					min: 0,
					max: 100,
				},
				silver: {
					min: 101,
					max: 500,
				},
				gold: {
					min: 501,
					max: 1000,
				},
			},
		},
		pricePriority: [],
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
			name,
			domain,
			description,
			aboutUs: description,
			addresses: [
				{
					province: 16,
					city: 16,
					address: '123 Main St',
				},
			],
			contactInformation,
			keywords: ['e-commerce', 'website'],
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
			cookies: {
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
			termsOfService: {
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

		links: [],
		enabled: true,
		integrations: {},
		navigations: {
			navbar: {
				left: [
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
				right: [],
			},
			footer: [
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
		},
		pagesContent: {
			home: {
				blogs: { categories: [], collections: [] },
				products: { categories: [], collections: [] },
			},
		},
		banners: [],
	};
};

async function seedWebsite() {
	const newWebsite = await website();
	const websiteDoc = await webSiteModel.create(newWebsite);
	console.log({ websiteDoc });
	return websiteDoc;
}
seed(seedWebsite);
