import { Router } from 'express';

import { UploadFile, uploadImageMulter } from '@server/handlers/files';
import { checkLogs, isLoggedIn } from '@server/middleware/auth';

const uploadRouter = Router();
uploadRouter.use(checkLogs, isLoggedIn);

if (uploadImageMulter) uploadRouter.route('/image').post(uploadImageMulter.single('image'), UploadFile);

export default uploadRouter;
