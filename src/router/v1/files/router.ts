import { Router } from 'express';

import { UploadImageFile, UploadOtherFile, uploadImageMulter, uploadOtherMulter } from '@server/handlers/files';
import { checkLogs, isLoggedIn } from '@server/middleware/auth';

const uploadRouter = Router();
uploadRouter.use(checkLogs, isLoggedIn);

if (uploadImageMulter) uploadRouter.route('/image').post(uploadImageMulter.single('image'), UploadImageFile);
if (uploadOtherMulter) uploadRouter.route('/file').post(uploadOtherMulter.single('file'), UploadOtherFile);

export default uploadRouter;
