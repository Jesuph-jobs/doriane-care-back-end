import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import reviewModel from '#common/Review';

export const updateReviewState = async (
	req: ERequest<WebSiteDocumentI, { reviewId: string }, ResponseI<null>, { enabled: boolean }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const review = await reviewModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.reviewId,
				},
				{
					$set: {
						enabled: req.body.enabled,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (review.modifiedCount === 0) throw new Error('Review not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Review updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update review", e, res);
	}
};
