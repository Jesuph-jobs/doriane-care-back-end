import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import supportRequestModel from '&common/SupportRequest';

export const getSupports = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<ListOf<PublicSupportRequestI>>>,
	res: Response<ResponseI<ListOf<PublicSupportRequestI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await supportRequestModel.find({ website: website._id }).lean();
		if (!list) throw new Error('Support requests not found');
		handleServiceResponse(
			new ServiceResponse<ListOf<PublicSupportRequestI>>(
				ResponseStatus.Success,
				'Support request fetched successfully',
				{ list: JSON.parse(JSON.stringify(list)), total: list.length },
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch Support requests", e, res);
	}
};
