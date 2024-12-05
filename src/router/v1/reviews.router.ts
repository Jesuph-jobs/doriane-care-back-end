import { Router } from 'express';

import { updateReviewState } from '@server/handlers/reviews';

const reviewsRouter = Router();

reviewsRouter.route('/:reviewId').put(updateReviewState);

export default reviewsRouter;
