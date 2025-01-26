import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import newsLetterModel from '&common/NewsLetter';

export const getNewsLetterSubscriptions = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<NewsLetterI[]>>,
	res: Response<ResponseI<NewsLetterI[]>>
) => {
	const website = req.records!.website!;
	try {
		const list = await newsLetterModel.find({ website: website._id }).lean();
		if (!list) throw new Error('newsletters not found');
		handleServiceResponse(
			new ServiceResponse<NewsLetterI[]>(
				ResponseStatus.Success,
				'Orders fetched successfully',
				JSON.parse(JSON.stringify(list)),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch newsletters", e, res);
	}
};
