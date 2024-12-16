import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { Types, isObjectIdOrHexString } from 'mongoose';
import orderModel from '#common/Order';
import reviewModel from '#common/Review';

export const getOrderById = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<OrderI>>,
	res: Response<ResponseI<OrderI>>
) => {
	const orderId = req.params.orderId;
	const website = req.records!.website!;
	try {
		const order = (await orderModel
			.findOne({
				website: website._id,
				_id: orderId,
			})
			.lean()) as OrderI | null;
		if (!order)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Order not found', new Error('Order not found'), res);
		handleServiceResponse(
			new ServiceResponse<OrderI>(ResponseStatus.Success, 'Order fetched successfully', order, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch order", e, res);
	}
};

export const getOrders = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<OrderTableDataI>>,
		any,
		SortableQuerySearchI<OrderSortableFields>
	>,
	res: Response<ResponseI<ListOf<OrderTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await orderModel.getOrdersTableData(req.query, website._id);
		if (!list) throw new Error('Orders not found');
		handleServiceResponse(
			new ServiceResponseList<OrderTableDataI>(
				ResponseStatus.Success,
				'Orders fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch orders", e, res);
	}
};
export const getDraftOrders = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<OrderTableDataI>>,
		any,
		SortableQuerySearchI<OrderSortableFields>
	>,
	res: Response<ResponseI<ListOf<OrderTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await orderModel.getOrdersTableData(req.query, website._id, {
			additionalFilter: {
				$or: [{ isPublished: { $exists: false } }, { isPublished: false }],
			},
		});
		if (!list) throw new Error('Orders not found');
		handleServiceResponse(
			new ServiceResponseList<OrderTableDataI>(
				ResponseStatus.Success,
				'Orders fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch orders", e, res);
	}
};
export const getDisabledOrders = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<OrderTableDataI>>,
		any,
		SortableQuerySearchI<OrderSortableFields>
	>,
	res: Response<ResponseI<ListOf<OrderTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await orderModel.getOrdersTableData(req.query, website._id, {
			additionalFilter: {
				$or: [{ enabled: { $exists: false } }, { enabled: false }],
			},
		});
		if (!list) throw new Error('Orders not found');
		handleServiceResponse(
			new ServiceResponseList<OrderTableDataI>(
				ResponseStatus.Success,
				'Orders fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch orders", e, res);
	}
};
export const createOrder = async (
	req: ERequest<WebSiteDocumentI & UserDocumentI, any, ResponseI<PublicOrderI>, OrderInformationI>,
	res: Response<ResponseI<PublicOrderI>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		const newOrder: CreateOrderI<Types.ObjectId> = {
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
		const order = (await orderModel.create(newOrder)).toOptimizedObject();
		handleServiceResponse(
			new ServiceResponse<PublicOrderI>(
				ResponseStatus.Success,
				'Order created successfully',
				order,
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create order", e, res);
	}
};

export const updateOrderState = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, PublishableStateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderLabels = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, PublishableLabelsI<OrderLabelsT>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
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
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderCategory = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, { categoryId: string }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
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
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderImages = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, OrderImagesI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
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
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};

export const updateOrderInformation = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, OrderInformationI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
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
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};

export const checkOrderSlug = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<boolean>, any, { slug: string; orderId?: string }>,
	res: Response<ResponseI<boolean>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.exists({
			website: website._id,
			slug: req.query.slug,
			...(req.query.orderId
				? {
						_id: {
							$ne: req.query.orderId,
						},
					}
				: {}),
		});
		handleServiceResponse(
			new ServiceResponse<boolean>(
				ResponseStatus.Success,
				order ? 'Slug already exists' : 'Slug is available',
				!!order,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't check slug", e, res);
	}
};
// OrderAdditionalI;
export const updateOrderAdditional = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, OrderAdditionalI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
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
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};

export const updateOrderPricing = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, PricingI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.orderId,
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
		if (order.modifiedCount === 0) throw new Error('Order not found');
		handleServiceResponse(
			new ServiceResponse<null>(
				ResponseStatus.Success,
				'Order pricing updated successfully',
				null,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order pricing", e, res);
	}
};
export const getOrderReviews = async (
	req: ERequest<
		WebSiteDocumentI,
		{ orderId: string },
		ResponseI<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>
	>,
	res: Response<ResponseI<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>>
) => {
	const website = req.records!.website!;
	const orderId = req.params.orderId;
	try {
		const order = await orderModel
			.findOne({
				website: website._id,
				_id: orderId,
			})
			.lean();
		if (!order)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Order not found', new Error('Order not found'), res);
		const reviews = await reviewModel.aggregate<
			PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>
		>([
			{
				$match: {
					'link.ref': new Types.ObjectId(orderId),
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
				'Order reviews fetched successfully',
				reviews,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch order reviews", e, res);
	}
};
export const deleteOrders = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, { orderIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const orders = await orderModel.deleteMany({
			website: website._id,
			_id: {
				$in: req.body.orderIds,
			},
		});
		if (orders.deletedCount === 0) throw new Error('Orders not found');
		if (orders.deletedCount !== req.body.orderIds.length) throw new Error('Some orders not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Orders deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete orders", e, res);
	}
};
