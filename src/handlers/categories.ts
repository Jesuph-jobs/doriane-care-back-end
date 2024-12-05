import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { Types, isObjectIdOrHexString } from 'mongoose';
import categoryModel from '#common/Category';

export const getCategoryById = async (
	req: ERequest<WebSiteDocumentI, { categoryId: string }, ResponseI<CategoryI>>,
	res: Response<ResponseI<CategoryI>>
) => {
	const categoryId = req.params.categoryId;
	const website = req.records!.website!;
	try {
		const category = (await categoryModel
			.findOne({
				website: website._id,
				_id: categoryId,
			})
			.lean()) as CategoryI | null;
		if (!category)
			return handleErrorResponse(
				StatusCodes.NOT_FOUND,
				'Category not found',
				new Error('Category not found'),
				res
			);
		handleServiceResponse(
			new ServiceResponse<CategoryI>(
				ResponseStatus.Success,
				'Category fetched successfully',
				category,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch category", e, res);
	}
};

export const getCategories = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CategoryTableDataI>>,
		any,
		SortableQuerySearchI<CategorySortableFields>
	>,
	res: Response<ResponseI<ListOf<CategoryTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await categoryModel.getCategoriesTableDataI(req.query, website._id, {
			categoryType: req.query.categoryType === 'b' ? 'b' : 'p',
		});
		if (!list) throw new Error('Categories not found');
		handleServiceResponse(
			new ServiceResponseList<CategoryTableDataI>(
				ResponseStatus.Success,
				'Categories fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch categories", e, res);
	}
};
export const getBasicCategories = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<BasicPublishableWithIdI[]>,
		any,
		{ forCategory: PublishableContentTypeI }
	>,
	res: Response<ResponseI<BasicPublishableWithIdI[]>>
) => {
	const website = req.records!.website!;
	try {
		console.log('req.query.forCategory', req.query.forCategory);
		const list = await categoryModel.find(
			{
				website: website._id,
				enabled: true,
				for: req.query.forCategory,
			},
			{
				_id: 1,
				name: 1,
			}
		);
		if (!list) throw new Error('Categories not found');
		handleServiceResponse(
			new ServiceResponse<BasicPublishableWithIdI[]>(
				ResponseStatus.Success,
				'Categories fetched successfully',
				list as BasicPublishableWithIdI[],
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch categories", e, res);
	}
};
export const getDraftCategories = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CategoryTableDataI>>,
		any,
		SortableQuerySearchI<CategorySortableFields>
	>,
	res: Response<ResponseI<ListOf<CategoryTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await categoryModel.getCategoriesTableDataI(req.query, website._id, {
			categoryType: req.query.categoryType === 'b' ? 'b' : 'p',
			additionalFilter: {
				$or: [{ isPublished: { $exists: false } }, { isPublished: false }],
			},
		});
		if (!list) throw new Error('Categories not found');
		handleServiceResponse(
			new ServiceResponseList<CategoryTableDataI>(
				ResponseStatus.Success,
				'Categories fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch categories", e, res);
	}
};
export const getDisabledCategories = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CategoryTableDataI>>,
		any,
		SortableQuerySearchI<CategorySortableFields>
	>,
	res: Response<ResponseI<ListOf<CategoryTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await categoryModel.getCategoriesTableDataI(req.query, website._id, {
			categoryType: req.query.categoryType === 'b' ? 'b' : 'p',
			additionalFilter: {
				$or: [{ enabled: { $exists: false } }, { enabled: false }],
			},
		});
		if (!list) throw new Error('Categories not found');
		handleServiceResponse(
			new ServiceResponseList<CategoryTableDataI>(
				ResponseStatus.Success,
				'Categories fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch categories", e, res);
	}
};
export const createCategory = async (
	req: ERequest<WebSiteDocumentI & UserDocumentI, any, ResponseI<PublicCategoryI>, CategoryInformationI>,
	res: Response<ResponseI<PublicCategoryI>>
) => {
	const website = req.records!.website!;
	try {
		const newCategory: CategoryI<Types.ObjectId> = {
			...req.body,
			website: website._id,
			avatar: {
				src: '',
				alt: '',
				height: 0,
				width: 0,
			},
			cover: {
				src: '',
				alt: '',
				height: 0,
				width: 0,
			},
			tags: [],
			isPublished: false,
			enabled: true,
		};
		const category = (await categoryModel.create(newCategory)).toOptimizedObject();
		handleServiceResponse(
			new ServiceResponse<OptimizedCategoryI>(
				ResponseStatus.Success,
				'Category created successfully',
				category,
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create category", e, res);
	}
};

export const updateCategoryState = async (
	req: ERequest<WebSiteDocumentI, { categoryId: string }, ResponseI<null>, PublishableStateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const category = await categoryModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.categoryId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (category.modifiedCount === 0) throw new Error('Category not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Category updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update category", e, res);
	}
};
export const updateCategoryLabels = async (
	req: ERequest<WebSiteDocumentI, { categoryId: string }, ResponseI<null>, PublishableLabelsI<CategoryLabelsT>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const category = await categoryModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.categoryId,
				},
				{
					$set: {
						...(req.body.label ? { label: req.body.label, tags: req.body.tags } : { tags: req.body.tags }),
					},
					...(req.body.label
						? {}
						: {
								$unset: {
									label: '',
								},
							}),
				},
				{
					new: true,
				}
			)
			.lean();
		if (category.modifiedCount === 0) throw new Error('Category not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Category updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update category", e, res);
	}
};
export const updateCategoryParentCategory = async (
	req: ERequest<WebSiteDocumentI, { categoryId: string }, ResponseI<null>, { parentCategoryId: string }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const category = await categoryModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.categoryId,
				},
				{
					...(req.body.parentCategoryId && isObjectIdOrHexString(req.body.parentCategoryId)
						? {
								$set: {
									parentCategory: new Types.ObjectId(req.body.parentCategoryId),
								},
							}
						: {
								$unset: {
									parentCategory: '',
								},
							}),
				},
				{
					new: true,
				}
			)
			.lean();
		if (category.modifiedCount === 0) throw new Error('Category not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Category updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update category", e, res);
	}
};
export const updateCategoryImages = async (
	req: ERequest<WebSiteDocumentI, { categoryId: string }, ResponseI<null>, CategoryImagesI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const category = await categoryModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.categoryId,
				},
				{
					$set: {
						cover: req.body.cover,
						avatar: req.body.avatar,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (category.modifiedCount === 0) throw new Error('Category not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Category updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update category", e, res);
	}
};

export const updateCategoryInformation = async (
	req: ERequest<WebSiteDocumentI, { categoryId: string }, ResponseI<null>, CategoryInformationI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const category = await categoryModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.categoryId,
				},
				{
					$set: {
						name: req.body.name,
						for: req.body.for,
						summary: req.body.summary,
						slug: req.body.slug,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (category.modifiedCount === 0) throw new Error('Category not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Category updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update category", e, res);
	}
};

export const checkCategorySlug = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<boolean>, any, { slug: string; categoryId?: string }>,
	res: Response<ResponseI<boolean>>
) => {
	const website = req.records!.website!;
	try {
		const category = await categoryModel.exists({
			website: website._id,
			slug: req.query.slug,
			...(req.query.categoryId
				? {
						_id: {
							$ne: req.query.categoryId,
						},
					}
				: {}),
		});
		handleServiceResponse(
			new ServiceResponse<boolean>(
				ResponseStatus.Success,
				category ? 'Slug already exists' : 'Slug is available',
				!!category,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't check slug", e, res);
	}
};

export const deleteCategories = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, { categoryIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const categories = await categoryModel.deleteMany({
			website: website._id,
			_id: {
				$in: req.body.categoryIds,
			},
		});
		if (categories.deletedCount === 0) throw new Error('Categories not found');
		if (categories.deletedCount !== req.body.categoryIds.length) throw new Error('Some categories not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Categories deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete categories", e, res);
	}
};
