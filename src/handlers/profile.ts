import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { UserHydratedDocument } from '!common/generated/models/user';
import type { ERequest } from '!server/E_Express';

export const getContactInformation = async (
	req: ERequest<UserDocumentI, any, ResponseI<ContactInformationI>>,
	res: Response<ResponseI<ContactInformationI>>
) => {
	const user = req.records!.user as UserHydratedDocument;

	handleServiceResponse(
		new ServiceResponse<ContactInformationI>(
			ResponseStatus.Success,
			'User apps have been retrieved',
			user.contactInformation,
			StatusCodes.OK
		),
		res
	);
};

export const updateContactInformation = async (
	req: ERequest<UserDocumentI, any, ResponseI<OptimizedUserI>, ContactInformationI>,
	res: Response<ResponseI<OptimizedUserI>>
) => {
	const user = req.records!.user as UserHydratedDocument;
	const contactInformation = req.body;
	user.contactInformation = contactInformation;
	try {
		await user.save();
		handleServiceResponse(
			new ServiceResponse<OptimizedUserI>(
				ResponseStatus.Success,
				'Contact information has been updated',
				user.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Contact information couldn't be updated", e, res);
	}
};

export const updatePersonalInformation = async (
	req: ERequest<UserDocumentI, any, ResponseI<OptimizedUserI>, PersonalInformationI>,
	res: Response<ResponseI<OptimizedUserI>>
) => {
	const user = req.records!.user as UserHydratedDocument;
	const personalInformation = req.body;
	user.personalInformation = personalInformation;
	try {
		await user.save();
		handleServiceResponse(
			new ServiceResponse<OptimizedUserI>(
				ResponseStatus.Success,
				'Personal information has been updated',
				user.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Personal information couldn't be updated", e, res);
	}
};

export const updateMainContact =
	(contactMethod: 'email' | 'phone') =>
	async (
		req: ERequest<UserDocumentI, any, ResponseI<OptimizedUserI>, { value: string }>,
		res: Response<ResponseI<OptimizedUserI>>
	) => {
		const user = req.records!.user as UserHydratedDocument;
		const { value } = req.body;
		try {
			if (contactMethod === 'email') {
				if (!user.contactInformation.emails.includes(value)) throw new Error('Email not found');
				user.email = value;
			} else {
				if (!user.contactInformation.phones.map(p => p.number).includes(value))
					throw new Error('Phone not found');
				user.phone = value;
			}
			await user.save();
			handleServiceResponse(
				new ServiceResponse<OptimizedUserI>(
					ResponseStatus.Success,
					'Main contact has been updated',
					user.toOptimizedObject(),
					StatusCodes.OK
				),
				res
			);
		} catch (e) {
			handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Main contact couldn't be updated", e, res);
		}
	};
export const updatePassword = async (
	req: ERequest<UserDocumentI, any, ResponseI<null>, ChangePasswordI>,
	res: Response<ResponseI<null>>
) => {
	const user = req.records!.user as UserHydratedDocument;
	const { oldPassword, newPassword } = req.body;
	try {
		if (!(await user.comparePassword(oldPassword))) throw new Error('Invalid password');
		user.password = newPassword;
		await user.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Password has been updated', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Password couldn't be updated", e, res);
	}
};
export const updatePicture = async (
	req: ERequest<UserDocumentI, any, ResponseI<OptimizedUserI>, { profilePicture?: string }>,
	res: Response<ResponseI<OptimizedUserI>>
) => {
	const user = req.records!.user as UserHydratedDocument;
	const { profilePicture } = req.body;
	user.profilePicture = profilePicture;
	try {
		await user.save();
		handleServiceResponse(
			new ServiceResponse<OptimizedUserI>(
				ResponseStatus.Success,
				'Picture has been updated',
				user.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Picture couldn't be updated", e, res);
	}
};
