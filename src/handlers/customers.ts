import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import customerModel from '&common/Customer';

import baseCustomerModel from '&common/BaseCustomer';
import { generatePassword } from '@server/utils/password';

export const getCustomerById = async (
	req: ERequest<null, { customerId: string }, ResponseI<CustomerTableDataI>>,
	res: Response<ResponseI<CustomerTableDataI>>
) => {
	const customerId = req.params.customerId;
	try {
		const customer = await baseCustomerModel.findById(customerId).select('-password');

		if (!customer)
			return handleErrorResponse(
				StatusCodes.NOT_FOUND,
				'Customer not found',
				new Error('Customer not found'),
				res
			);

		handleServiceResponse(
			new ServiceResponse<CustomerTableDataI>(
				ResponseStatus.Success,
				'Customer fetched successfully',
				customer.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch customer", e, res);
	}
};

export const getBaseCustomers = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CustomerTableDataI>>,
		any,
		SortableQuerySearchI<BaseCustomerSortableFields> & { enabled?: string }
	>,
	res: Response<ResponseI<ListOf<CustomerTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await baseCustomerModel.getBaseCustomersTableData(req.query, website._id);
		if (!list) throw new Error('Customers not found');
		handleServiceResponse(
			new ServiceResponseList<CustomerTableDataI>(
				ResponseStatus.Success,
				'Customers fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch customers", e, res);
	}
};
export const getCustomers = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CustomerTableDataI>>,
		any,
		SortableQuerySearchI<BaseCustomerSortableFields> & { enabled?: string }
	>,
	res: Response<ResponseI<ListOf<CustomerTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await baseCustomerModel.getBaseCustomersTableData(req.query, website._id, {
			additionalFilter: req.query.enabled ? { enabled: req.query.enabled === 'true' } : {},
			kind: 'Customer',
		});
		if (!list) throw new Error('Customers not found');
		handleServiceResponse(
			new ServiceResponseList<CustomerTableDataI>(
				ResponseStatus.Success,
				'Customers fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch customers", e, res);
	}
};
export const getGuests = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CustomerTableDataI>>,
		any,
		SortableQuerySearchI<BaseCustomerSortableFields>
	>,
	res: Response<ResponseI<ListOf<CustomerTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await baseCustomerModel.getBaseCustomersTableData(req.query, website._id, {
			kind: 'Guest',
		});
		if (!list) throw new Error('Guests not found');
		handleServiceResponse(
			new ServiceResponseList<CustomerTableDataI>(
				ResponseStatus.Success,
				'Guests fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch guests", e, res);
	}
};

export const createCustomer = async (
	req: ERequest<
		WebSiteDocumentI & UserDocumentI,
		any,
		ResponseI<NecessaryCustomerI>,
		Omit<CustomerRegisterI, 'password'>
	>,
	res: Response<ResponseI<NecessaryCustomerI>>
) => {
	const website = req.records!.website!;
	// const user = req.records!.user!;
	try {
		const { personalInformation, phone, email } = req.body;
		const password = generatePassword();
		const customerFound = await customerModel.exists({ email, website: website._id });
		if (customerFound) throw new Error('Email already exists!');

		// Form a DB payload
		const newCustomer: CustomerRegisterI = {
			personalInformation,
			phone,
			email,
			password,
		};
		// Update the DB
		const customerD = await customerModel.create({ ...newCustomer, website: website._id });

		handleServiceResponse(
			new ServiceResponse<NecessaryCustomerI>(
				ResponseStatus.Success,
				'Customer created successfully',
				customerD.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create customer", e, res);
	}
};

export const updateCustomerState = async (
	req: ERequest<WebSiteDocumentI, { customerId: string }, ResponseI<null>, Pick<PublishableStatesI, 'enabled'>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const customer = await customerModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.customerId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (customer.modifiedCount === 0) throw new Error('Customer not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Customer updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update customer", e, res);
	}
};

export const deleteCustomers = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, { customerIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const customers = await customerModel.deleteMany({
			website: website._id,
			_id: {
				$in: req.body.customerIds,
			},
			status: 'pending',
		});
		if (customers.deletedCount === 0) throw new Error('Customers not found');
		if (customers.deletedCount !== req.body.customerIds.length)
			throw new Error('Some customers not found or not deletable');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Customers deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete customers", e, res);
	}
};
