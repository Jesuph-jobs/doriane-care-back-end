import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';

import adminModel from '&common/user';
import { rolesManagerService } from '@server/services';
import { generatePassword } from '@server/utils/password';

export const getAdminById = async (
	req: ERequest<null, { adminId: string }, ResponseI<PublicAdminI>>,
	res: Response<ResponseI<PublicAdminI>>
) => {
	const adminId = req.params.adminId;
	try {
		const admin = await adminModel.findById(adminId).select('-password');

		if (!admin)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Admin not found', new Error('Admin not found'), res);

		handleServiceResponse(
			new ServiceResponse<PublicAdminI>(
				ResponseStatus.Success,
				'Admin fetched successfully',
				admin.toPublicAdmin(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch admin", e, res);
	}
};

export const getAdmins = async (
	req: ERequest<
		null,
		any,
		ResponseI<ListOf<AdminTableDataI>>,
		any,
		SortableQuerySearchI<UserSortableFields> & { enabled?: string }
	>,
	res: Response<ResponseI<ListOf<AdminTableDataI>>>
) => {
	try {
		const list = await adminModel.getAdminsTableData(req.query, {
			additionalFilter: req.query.enabled ? { enabled: req.query.enabled === 'true' } : {},
		});
		if (!list) throw new Error('Admins not found');
		handleServiceResponse(
			new ServiceResponseList<AdminTableDataI>(
				ResponseStatus.Success,
				'Admins fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch admins", e, res);
	}
};

export const createAdmin = async (
	req: ERequest<UserDocumentI, any, ResponseI<PublicAdminI>, Omit<UserI, 'password'>>,
	res: Response<ResponseI<PublicAdminI>>
) => {
	// const user = req.records!.user!;
	try {
		const adminFound = await adminModel.exists({ email: req.body.email });
		if (adminFound) throw new Error('Email already exists!');

		const password = generatePassword();

		// Form a DB payload
		const newAdmin: UserI = { ...req.body, password };
		// Update the DB
		const adminD = await adminModel.create(newAdmin);

		handleServiceResponse(
			new ServiceResponse<PublicAdminI>(
				ResponseStatus.Success,
				'Admin created successfully',
				adminD.toPublicAdmin(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create admin", e, res);
	}
};
export const updateAdmin = async (
	req: ERequest<UserDocumentI, { adminId: string }, ResponseI<null>, Omit<UserI, 'password'>>,
	res: Response<ResponseI<null>>
) => {
	// const user = req.records!.user!;
	try {
		const adminFound = await adminModel.findById(req.params.adminId);
		if (!adminFound) throw new Error('Admin not found');

		//const password = generatePassword();

		// Form a DB payload
		const { email, personalInformation, phone } = req.body;
		if (email) adminFound.email = email;
		if (personalInformation) adminFound.personalInformation = personalInformation;
		if (phone) adminFound.phone = phone;

		await adminFound.save();

		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Admin created successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create admin", e, res);
	}
};

export const updateAdminState = async (
	req: ERequest<null, { adminId: string }, ResponseI<null>, Pick<PublishableStatesI, 'enabled'>>,
	res: Response<ResponseI<null>>
) => {
	try {
		const admin = await adminModel
			.updateOne(
				{
					_id: req.params.adminId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (admin.modifiedCount === 0) throw new Error('Admin not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Admin updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update admin", e, res);
	}
};

export const deleteAdmins = async (
	req: ERequest<null, any, ResponseI<null>, { adminIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	try {
		const admins = await adminModel.find({
			_id: {
				$in: req.body.adminIds,
			},
		});
		if (admins.length === 0) throw new Error('Admins not found');
		if (admins.length !== req.body.adminIds.length) throw new Error('Some admins not found ');
		admins.forEach(admin => {
			if (rolesManagerService.rolesHavePermission(admin.roles, ['admin:super']))
				throw new Error('one of the admins is undeletable');
		});
		await adminModel.deleteMany({
			_id: {
				$in: req.body.adminIds,
			},
		});
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Admins deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete admins", e, res);
	}
};
