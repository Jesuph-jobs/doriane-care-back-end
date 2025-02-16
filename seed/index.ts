//import { loadCities, saveCities } from './cities';
//import { website } from './website';

import productModel from '&common/Product';
import mongoose from 'mongoose';
//import { websites } from './website';
import { Types } from 'mongoose';
import partialProducts from './products';
// import { seedUsers } from './admin';
// import { seedCategoriesWithPublishable } from './categories';
//import { getRandomRoles } from './roles';
import seedServices from './services';
async function seed() {
	/* const cities = await loadCities();
	console.log(cities);
	await saveCities(cities);
	await writeJSONFile('./website.json', website); */
	console.time('server');
	await Promise.all(seedServices);
	console.timeEnd('server');

	mongoose.set('debug', false);
	console.time('seeding');
	console.timeLog('seeding', 'started');
	const product = (np: {
		name: LanguagesContentI;
		colors: {
			available: boolean;
			label: LanguagesContentI;
			value: string;
		}[];
	}) => ({
		additional: {
			usage: {
				en: '<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Mix </strong>the dye with the cream developer in the required ratio in a plastic container. </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Apply </strong>the mixture to your hair, focusing on the roots, using a specialized brush or comb. </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Leave it </strong>on for 30–35 minutes. For gray hair coverage exceeding 60%, extend the time to 40–45 minutes. </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Rinse </strong>the dye thoroughly with plenty of water.</li></ol>',
				ar: '<p>اخلطي الصبغة مع المظهر الكريمي بالنسبة المطلوبة في وعاء بلاستيكي. ضعي المزيج على شعرك، مع التركيز على الجذور باستخدام فرشاة أو مشط متخصص. اتركيه لمدة 30-35 دقيقة. لتغطية الشعر الأبيض بنسبة تزيد عن 60%، زيدي الوقت إلى 40-45 دقيقة. أخيرًا، اشطفي الصبغة جيدًا باستخدام كمية وفيرة من الماء.</p>',
				fr: '<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Mélangez </strong>la teinture avec le révélateur en crème selon le ratio requis dans un récipient en plastique. </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Appliquez </strong>le mélange sur vos cheveux, en accordant une attention particulière aux racines, à l\'aide d\'une brosse ou d\'un peigne spécialisé. </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Laissez poser </strong>pendant 30 à 35 minutes. Si plus de 60 % de vos cheveux sont gris, augmentez le temps à 40 - 45 minutes. </li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><strong>Rincez </strong>soigneusement la teinture avec beaucoup d\'eau.</li></ol>',
			},
			colors: np.colors,
			sizes: [
				{
					label: {
						en: '500ML',
						ar: '500مل',
						fr: '500ML',
					},
					available: true,
					value: '500',
					imagesIndex: [],
				},
				{
					label: {
						en: '1000ML',
						ar: '1000مل',
						fr: '1000ML',
					},
					price: {
						current: 400,
					},
					available: true,
					value: '1000',
					imagesIndex: [],
				},
			],
			catalogue: 'https://files.aquasoft-dz.com/other/1738167994367-575992746-Hair-colours-PDF.pdf',
		},
		createdBy: new Types.ObjectId('6760045b0e4b40da03969a92'),
		description: {
			en: 'Morfose Hair Color Cream is a semi-permanent hair color designed to deliver vibrant, radiant, bold color. Its rich formula delivers twice the color vibrancy on natural hair, while providing full coverage on gray hair. Thanks to its low ammonia content, scalp irritation is minimized, while its plant-based complex deserves special attention.',
			ar: 'كريم تلوين الشعر مورفوس كريمي هو لون شعر شبه دائم مصمم لمنح الشعر لونًا حيويًا ومشرقًا وجريئًا. توفر تركيبته الغنية تألقًا لونيًا مضاعفًا على الشعر الطبيعي، بينما توفر تغطية كاملة للشعر الرمادي. يقلل محتواه المنخفض من الأمونيا من تهيج فروة الرأس, بينما تستحق تركيبته النباتية اهتماماً خاصاً.',
			fr: "La crème colorante pour cheveux de Morfose est une coloration semi-permanente conçue pour offrir des couleurs vibrantes, éclatantes et audacieuses. Sa formule riche permet d'obtenir une couleur deux fois plus éclatante sur les cheveux naturels, tout en offrant une couverture totale des cheveux gris. Grâce à sa faible teneur en ammoniaque, l'irritation du cuir chevelu est minimisée, tandis que son complexe à base de plantes mérite une attention particulière. ",
		},
		name: {
			en: `Color Cream (${np.name.en})`,
			ar: `كريم التلوين (${np.name.ar})`,
			fr: `Crème Colorante (${np.name.fr})`,
		},
		thumbnail: {
			src: 'https://files.aquasoft-dz.com/images/1735588433079-994671609-Cr%C3%83%C2%A8me-colorante-Morfose-100ml.png',
			alt: 'placeholder',
			width: 1403,
			height: 2287,
		},
		images: [
			{
				src: 'https://files.aquasoft-dz.com/images/1737312012031-153795263-colorante-Morfose-100ml.webp',
				alt: 'placeholder',
				width: 1403,
				height: 2287,
			},
			{
				src: 'https://files.aquasoft-dz.com/images/1737311936129-137665999-Frame-94.png',
				alt: 'catalogue',
				width: 569,
				height: 398,
			},
		],
		pricing: {
			current: 280,
			original: 350,
		},
		sku: `color-cream-${np.name.en.toLowerCase().replace(/ /g, '-')}`,
		ratingAggregation: {
			count: 0,
			average: 0,
			distribution: [0, 0, 0, 0, 0],
		},
		soldAggregation: {
			count: 0,
			delivered: 0,
		},
		website: new Types.ObjectId('674b7fb77bb4d56ad4b90d6b'),
		enabled: true,
		isPublished: true,
		slug: `color-cream-${np.name.en.toLowerCase().replace(/ /g, '-')}`,
		tags: [],
		summary: {
			en: 'Morfose Hair Color Cream is a semi-permanent hair color designed to deliver vibrant, radiant, bold color. Its rich formula delivers twice the color vibrancy on natural hair, while providing full coverage on gray hair. Thanks to its low ammonia content, scalp irritation is minimized, while its plant-based complex deserves special attention.',
			ar: 'كريم تلوين الشعر مورفوس كريمي هو لون شعر شبه دائم مصمم لمنح الشعر لونًا حيويًا ومشرقًا وجريئًا. توفر تركيبته الغنية تألقًا لونيًا مضاعفًا على الشعر الطبيعي، بينما توفر تغطية كاملة للشعر الرمادي. يقلل محتواه المنخفض من الأمونيا من تهيج فروة الرأس, بينما تستحق تركيبته النباتية اهتماماً خاصاً.',
			fr: "La crème colorante pour cheveux de Morfose est une coloration semi-permanente conçue pour offrir des couleurs vibrantes, éclatantes et audacieuses. Sa formule riche permet d'obtenir une couleur deux fois plus éclatante sur les cheveux naturels, tout en offrant une couverture totale des cheveux gris.",
		},
		category: new Types.ObjectId('6777ebe8ab77715b5a36bacf'),
		label: 'featured',
		pricePriority: ['sizes', 'colors'],
	});
	try {
		const newProductsPromises = partialProducts
			.map(p => {
				const newProduct = product(p);
				return new productModel(newProduct);
			})
			.map(p => p.save());
		const newProducts = await Promise.all(newProductsPromises);
		console.log(newProducts);
	} catch (err) {
		console.error(err);
	}

	/*  console.log(	
		partialProducts,
		partialProducts.length,
		partialProducts.reduce((acc, curr) => acc + curr.colors.length, 0) 
	);
	*/
	// const web = await seedWebsite();
	/* await Promise.all([
		//seedCollectionsWithPublishable(website, 'b'),
		seedCategoriesWithPublishable(website, 'b'),
		//seedCollectionsWithPublishable(website, 'p'),
		seedCategoriesWithPublishable(website, 'p'),
	]); */
	//await Promise.all([seedRoles(web._id, 3, ['admin:super']), seedRoles(undefined, 3, ['admin:super'])]);

	/* 	const roles = await Promise.all([getRandomRoles(), getRandomRoles(websites[0])]);
	const user = await seedUsers(roles.flat(1).map(r => r._id));
	console.log({ user });
	*/
	console.timeLog('seeding', 'ended');
	console.timeEnd('seeding');
	/* 	console.time('search');

	const v = await productModel
		.fuzzySearch('Soap')
		.find({ website })
		.sort({ 'pricing.current': -1 }, { override: true });

	console.log({ v, length: v.length });
	console.timeEnd('search'); */

	/* 	console.time('test');
	const [x, y, z] = await Promise.all([getRandomProductsIds(10), getRandomProductsIds(10), getRandomProductsIds(10)]);

	console.log({ x, y, z });
	console.timeEnd('test'); */
	process.exit(0);
}

seed();
