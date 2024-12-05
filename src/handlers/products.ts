import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { Types, isObjectIdOrHexString } from 'mongoose';
import productModel from '#common/Product';
import reviewModel from '#common/Review';

export const getProductById = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<ProductI>>,
	res: Response<ResponseI<ProductI>>
) => {
	const productId = req.params.productId;
	const website = req.records!.website!;
	try {
		const product = (await productModel
			.findOne({
				website: website._id,
				_id: productId,
			})
			.lean()) as ProductI | null;
		if (!product)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Product not found', new Error('Product not found'), res);
		handleServiceResponse(
			new ServiceResponse<ProductI>(
				ResponseStatus.Success,
				'Product fetched successfully',
				product,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch product", e, res);
	}
};

export const getProducts = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<ProductTableDataI>>,
		any,
		SortableQuerySearchI<ProductSortableFields>
	>,
	res: Response<ResponseI<ListOf<ProductTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await productModel.getProductTableDataI(req.query, website._id);
		if (!list) throw new Error('Products not found');
		handleServiceResponse(
			new ServiceResponseList<ProductTableDataI>(
				ResponseStatus.Success,
				'Products fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch products", e, res);
	}
};
export const getDraftProducts = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<ProductTableDataI>>,
		any,
		SortableQuerySearchI<ProductSortableFields>
	>,
	res: Response<ResponseI<ListOf<ProductTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await productModel.getProductTableDataI(req.query, website._id, {
			$or: [{ isPublished: { $exists: false } }, { isPublished: false }],
		});
		if (!list) throw new Error('Products not found');
		handleServiceResponse(
			new ServiceResponseList<ProductTableDataI>(
				ResponseStatus.Success,
				'Products fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch products", e, res);
	}
};
export const getDisabledProducts = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<ProductTableDataI>>,
		any,
		SortableQuerySearchI<ProductSortableFields>
	>,
	res: Response<ResponseI<ListOf<ProductTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await productModel.getProductTableDataI(req.query, website._id, {
			$or: [{ enabled: { $exists: false } }, { enabled: false }],
		});
		if (!list) throw new Error('Products not found');
		handleServiceResponse(
			new ServiceResponseList<ProductTableDataI>(
				ResponseStatus.Success,
				'Products fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch products", e, res);
	}
};
export const createProduct = async (
	req: ERequest<WebSiteDocumentI & UserDocumentI, any, ResponseI<PublicProductI>, ProductInformationI>,
	res: Response<ResponseI<PublicProductI>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		const newProduct: CreateProductI<Types.ObjectId> = {
			...req.body,
			website: website._id,
			thumbnail: {
				src: '',
				alt: '',
				height: 0,
				width: 0,
			},
			images: [],
			pricing: { current: 0 },
			additional: {},
			tags: [],
			isPublished: false,
			enabled: true,
			createdBy: user._id,
		};
		const product = (await productModel.create(newProduct)).toOptimizedObject();
		handleServiceResponse(
			new ServiceResponse<PublicProductI>(
				ResponseStatus.Success,
				'Product created successfully',
				product,
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create product", e, res);
	}
};

export const updateProductState = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, PublishableStateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Product updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product", e, res);
	}
};
export const updateProductLabels = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, PublishableLabelsI<ProductLabelsT>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
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
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Product updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product", e, res);
	}
};
export const updateProductCategory = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, { categoryId: string }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
				},
				{
					...(req.body.categoryId && isObjectIdOrHexString(req.body.categoryId)
						? {
								$set: {
									category: new Types.ObjectId(req.body.categoryId),
								},
							}
						: {
								$unset: {
									category: '',
								},
							}),
				},
				{
					new: true,
				}
			)
			.lean();
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Product updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product", e, res);
	}
};
export const updateProductImages = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, ProductImagesI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
				},
				{
					$set: {
						images: req.body.images,
						thumbnail: req.body.thumbnail,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Product updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product", e, res);
	}
};

export const updateProductInformation = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, ProductInformationI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
				},
				{
					$set: {
						name: req.body.name,
						description: req.body.description,
						summary: req.body.summary,
						slug: req.body.slug,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Product updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product", e, res);
	}
};

export const checkProductSlug = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<boolean>, any, { slug: string; productId?: string }>,
	res: Response<ResponseI<boolean>>
) => {
	const website = req.records!.website!;
	try {
		const product = await productModel.exists({
			website: website._id,
			slug: req.query.slug,
			...(req.query.productId
				? {
						_id: {
							$ne: req.query.productId,
						},
					}
				: {}),
		});
		handleServiceResponse(
			new ServiceResponse<boolean>(
				ResponseStatus.Success,
				product ? 'Slug already exists' : 'Slug is available',
				!!product,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't check slug", e, res);
	}
};
// ProductAdditionalI;
export const updateProductAdditional = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, ProductAdditionalI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
				},
				{
					$set: {
						additional: req.body,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Product updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product", e, res);
	}
};

export const updateProductPricing = async (
	req: ERequest<WebSiteDocumentI, { productId: string }, ResponseI<null>, PricingI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const product = await productModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.productId,
				},
				{
					$set: {
						pricing: req.body,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (product.modifiedCount === 0) throw new Error('Product not found');
		handleServiceResponse(
			new ServiceResponse<null>(
				ResponseStatus.Success,
				'Product pricing updated successfully',
				null,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update product pricing", e, res);
	}
};
export const getProductReviews = async (
	req: ERequest<
		WebSiteDocumentI,
		{ productId: string },
		ResponseI<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>
	>,
	res: Response<ResponseI<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>>
) => {
	const website = req.records!.website!;
	const productId = req.params.productId;
	try {
		const product = await productModel
			.findOne({
				website: website._id,
				_id: productId,
			})
			.lean();
		if (!product)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Product not found', new Error('Product not found'), res);
		const reviews = await reviewModel.aggregate<
			PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>
		>([
			{
				$match: {
					'link.ref': new Types.ObjectId(productId),
					website: website._id,
				},
			},
			{
				$lookup: {
					from: 'costumers',
					localField: 'createdBy',
					foreignField: '_id',
					as: 'createdBy',
					pipeline: [
						{
							$project: {
								_id: 1,
								firstName: '$personalInformation.firstName',
								lastName: '$personalInformation.lastName',
							},
						},
					],
				},
			},
			{
				$unwind: {
					path: '$createdBy',
					preserveNullAndEmptyArrays: false,
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
		]);
		handleServiceResponse(
			new ServiceResponse<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>(
				ResponseStatus.Success,
				'Product reviews fetched successfully',
				reviews,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch product reviews", e, res);
	}
};
export const deleteProducts = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, { productIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const products = await productModel.deleteMany({
			website: website._id,
			_id: {
				$in: req.body.productIds,
			},
		});
		if (products.deletedCount === 0) throw new Error('Products not found');
		if (products.deletedCount !== req.body.productIds.length) throw new Error('Some products not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Products deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete products", e, res);
	}
};
