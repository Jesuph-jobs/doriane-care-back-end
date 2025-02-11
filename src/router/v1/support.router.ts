import { getSupports } from '@server/handlers/support';
import { Router } from 'express';
// import { validateRequest } from '@server/utils/httpHandlers';

const supportsRouter = Router();

supportsRouter.route('/').get(getSupports);

export default supportsRouter;
