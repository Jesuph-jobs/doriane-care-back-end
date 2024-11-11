import { Types } from 'mongoose';
import categoryModel from '#common/Category';
const website = new Types.ObjectId('672e626d22d00e6bfea3821d');

export async function getCategories() {
	return categoryModel.aggregate([
		{
			$match: {
				slug: 'desino-unus-cum',
				website: website,
			},
		},
		{
			$unset: ['description_fuzzy', 'name_fuzzy'],
		},
		{
			$lookup: {
				from: 'categories',
				localField: '_id',
				foreignField: 'parentCategory',
				as: 'subCategories',
				pipeline: [
					{
						$unset: ['description_fuzzy', 'name_fuzzy'],
					},
				],
			},
		},
		{
			$addFields: {
				refPath: {
					$cond: [
						{
							$eq: ['$for', 'p'],
						},
						'products',
						'blogs',
					],
				},
			},
		},
		{
			$facet: {
				// Only include results from "products" if "for" is "p"
				productResults: [
					{
						$match: {
							for: 'p',
						},
					},
					{
						$lookup: {
							from: 'products',
							localField: '_id',
							foreignField: 'category',
							as: 'publishable',
						},
					},
				],
				// Only include results from "blogs" if "for" is "b"
				blogResults: [
					{
						$match: {
							for: 'b',
						},
					},
					{
						$lookup: {
							from: 'blogs',
							localField: '_id',
							foreignField: 'category',
							as: 'publishable',
						},
					},
				],
			},
		},
		{
			$project: {
				publishableResults: {
					$cond: {
						if: {
							$gt: [
								{
									$size: '$productResults',
								},
								0,
							],
						},
						// biome-ignore lint/suspicious/noThenProperty: <just mongoose aggregation>
						then: '$productResults',
						else: '$blogResults',
					},
				},
			},
		},
		{
			$unwind: '$publishableResults',
		},
		{
			$replaceRoot: {
				newRoot: '$publishableResults',
			},
		},
	]);
}
