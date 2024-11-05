import { Router } from 'express';

import { healthCheck } from './handler';

const router = Router();
router.get('/', healthCheck);
export default router;
