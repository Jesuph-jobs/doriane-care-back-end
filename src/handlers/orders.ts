import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import guestModel from '&common/Guest';
import orderModel, { orderCustomerPipeline } from '&common/Order';
import { createOrder } from '@common/actions/server/checkout';

export const getOrderById = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<OrderI<SimpleProductI, SimpleCustomerI>>>,
	res: Response<ResponseI<OrderI<SimpleProductI, SimpleCustomerI>>>
) => {
	const orderId = req.params.orderId;
	const website = req.records!.website!;
	try {
		const order = (
			await orderModel.aggregate([
				{
					$match: {
						website: website._id,
						_id: orderId,
					},
					...orderCustomerPipeline,
				},
			])
		)[0] as OrderI<SimpleProductI, SimpleCustomerI> | undefined;

		if (!order)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Order not found', new Error('Order not found'), res);

		handleServiceResponse(
			new ServiceResponse<OrderI<SimpleProductI, SimpleCustomerI>>(
				ResponseStatus.Success,
				'Order fetched successfully',
				order,
				StatusCodes.OK
			),
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

export const createGuestOrder = async (
	req: ERequest<WebSiteDocumentI & UserDocumentI, any, ResponseI<PublicOrderI>, CheckoutAsGuestI>,
	res: Response<ResponseI<PublicOrderI>>
) => {
	const website = req.records!.website!;
	// const user = req.records!.user!;
	try {
		const { checkout, guest } = req.body;
		const guestD = await guestModel.create({
			...guest,
			website: website._id,
		});
		const orderD = await createOrder(checkout, website.toOptimizedObject(), {
			ref: guestD._id,
			refCollection: 'Guest',
		});

		handleServiceResponse(
			new ServiceResponse<PublicOrderI>(
				ResponseStatus.Success,
				'Order created successfully',
				orderD.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create order", e, res);
	}
};

export const updateOrderState = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, OrderStatusTypes>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		order.status = req.body;
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};

/* export const updateOrderInformation = async (
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
}; */

/* 
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
}; */

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
		if (orders.deletedCount !== req.body.orderIds.length) throw new Error('Some orders not found or not deletable');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Orders deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete orders", e, res);
	}
};
