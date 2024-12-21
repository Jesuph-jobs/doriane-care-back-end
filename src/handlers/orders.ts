import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import guestModel from '&common/Guest';
import orderModel, { adminOrderPipeline, customerOrderPipeline } from '&common/Order';
import { CalculateOrder, createOrder } from '@common/actions/server/checkout';
import { Types, isObjectIdOrHexString } from 'mongoose';

export const getOrderById = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<AdminOrderT>>,
	res: Response<ResponseI<AdminOrderT>>
) => {
	const orderId = req.params.orderId;
	const website = req.records!.website!;
	try {
		const order = (
			await orderModel.aggregate<AdminOrderT>([
				{
					$match: {
						website: website._id,
						_id: new Types.ObjectId(orderId),
					},
				},
				...customerOrderPipeline,
				...adminOrderPipeline,
			])
		)[0];

		if (!order)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Order not found', new Error('Order not found'), res);

		handleServiceResponse(
			new ServiceResponse<AdminOrderT>(
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
		SortableQuerySearchI<OrderSortableFields> & { status?: OrderStatusTypes }
	>,
	res: Response<ResponseI<ListOf<OrderTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await orderModel.getOrdersTableData(req.query, website._id, {
			additionalFilter: req.query.status
				? {
						status: req.query.status,
					}
				: {},
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
export const getCustomerOrders = async (
	req: ERequest<
		WebSiteDocumentI,
		{ customerId: string },
		ResponseI<ListOf<OrderTableDataI>>,
		any,
		SortableQuerySearchI<OrderSortableFields> & { status?: OrderStatusTypes }
	>,
	res: Response<ResponseI<ListOf<OrderTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		if (!req.params.customerId || !isObjectIdOrHexString(req.params.customerId))
			throw new Error('customerId is not valable id');
		const customerId = new Types.ObjectId(req.params.customerId);
		const list = await orderModel.getOrdersTableData(req.query, website._id, {
			additionalFilter: {
				...(req.query.status
					? {
							status: req.query.status,
						}
					: {}),
				customer: customerId,
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
		const orderD = await createOrder(checkout, website.toOptimizedObject(), guestD._id);

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
const allowedStatusChanges: Record<OrderStatusTypes, OrderStatusTypes[]> = {
	pending: ['confirmed', 'cancelled'],
	confirmed: ['shipped', 'cancelled'],
	shipped: ['returned', 'delivered'],
	delivered: ['returned'],
	cancelled: ['confirmed'],
	returned: ['confirmed'],
};
const updateAllowedStatus: OrderStatusTypes[] = ['pending', 'confirmed'];

export const updateOrderState = async (
	req: ERequest<WebSiteDocumentI | UserDocumentI, { orderId: string }, ResponseI<null>, { status: OrderStatusTypes }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		const status = req.body.status;
		if (!allowedStatusChanges[order.status].includes(status))
			throw new Error(`You can't change state from '${order.status}' to '${status}'`);
		order.status = status;
		order.statusHistory.push({
			changedBy: user._id,
			status: status,
		});
		await order.save();
		handleServiceResponse(
			new ServiceResponse<null>(
				ResponseStatus.Success,
				`Order updated to ${status} successfully`,
				null,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};

export const updateOrderDeliveryInformation = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, DeliverOptionsI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		if (!updateAllowedStatus.includes(order.status))
			throw new Error(`You can't update order if status is ${order.status}.`);
		const { shipping, subTotal } = CalculateOrder(order.products, website.toOptimizedObject(), req.body);
		order.delivery = {
			...req.body,
			cost: shipping,
		};
		order.totalPrice = subTotal + shipping;
		await order.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderDeliveryCost = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, { cost: number }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		if (!updateAllowedStatus.includes(order.status))
			throw new Error(`You can't update order if status is ${order.status}.`);
		order.totalPrice = order.totalPrice + (req.body.cost - order.delivery.cost);
		order.delivery.cost = req.body.cost;
		await order.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderTotalPrice = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, { totalPrice: number }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		if (!updateAllowedStatus.includes(order.status))
			throw new Error(`You can't update order if status is ${order.status}.`);
		order.totalPrice = req.body.totalPrice;
		await order.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderProductPrice = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, OrderProductPriceUpdateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		if (!updateAllowedStatus.includes(order.status))
			throw new Error(`You can't update order if status is ${order.status}.`);
		const { price, productId, variantId } = req.body;
		const productIndex = order.products.findIndex(productItem => {
			if (productItem.product.productId.equals(productId)) {
				if (variantId) {
					return !!(productItem.product.variant as VariantI & { _id: Types.ObjectId })._id?.equals(variantId);
				}
				return true;
			}
			return false;
		});
		if (productIndex === -1) throw new Error('Product not found in this order.');
		order.products[productIndex].product.price = price;
		const subTotal = order.products.reduce((acc, p) => acc + p.count * p.product.price, 0);
		order.totalPrice = subTotal + order.delivery.cost;
		await order.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};
export const updateOrderProductCount = async (
	req: ERequest<WebSiteDocumentI, { orderId: string }, ResponseI<null>, OrderProductCountUpdateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const order = await orderModel.findOne({
			website: website._id,
			_id: req.params.orderId,
		});
		if (!order) throw new Error('Order not found');
		if (!updateAllowedStatus.includes(order.status))
			throw new Error(`You can't update order if status is ${order.status}.`);
		const { count, productId, variantId } = req.body;
		const productIndex = order.products.findIndex(productItem => {
			if (productItem.product.productId.equals(productId)) {
				if (variantId) {
					return !!(productItem.product.variant as VariantI & { _id: Types.ObjectId })._id?.equals(variantId);
				}
				return true;
			}
			return false;
		});
		if (productIndex === -1) throw new Error('Product not found in this order.');
		order.products[productIndex].count = count;
		const subTotal = order.products.reduce((acc, p) => acc + p.count * p.product.price, 0);
		order.totalPrice = subTotal + order.delivery.cost;
		await order.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Order updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update order", e, res);
	}
};

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
			status: 'pending',
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
