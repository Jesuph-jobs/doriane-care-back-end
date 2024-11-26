import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import productModel from '#common/Product';

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
		if (!product) throw new Error('Product not found');
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
		const list = await productModel.getProductTableDataI(req.query, website);
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
	req: ERequest<WebSiteDocumentI, any, ResponseI<PublicProductI>, ProductI>,
	res: Response<ResponseI<PublicProductI>>
) => {
	const website = req.records!.website!;
	try {
		const product = (
			await productModel.create({
				...req.body,
				website: website._id,
			})
		).toOptimizedObject();
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
