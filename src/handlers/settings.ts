import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import type { Types } from 'mongoose';

export const getWebsiteSettings = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<PublicWebSiteI<Types.ObjectId>>>,
	res: Response<ResponseI<PublicWebSiteI<Types.ObjectId>>>
) => {
	const website = req.records!.website!;
	try {
		handleServiceResponse(
			new ServiceResponse<PublicWebSiteI<Types.ObjectId>>(
				ResponseStatus.Success,
				`Website ${website.FY_ID} Settings fetched successfully`,
				website.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch website settings", e, res);
	}
};
