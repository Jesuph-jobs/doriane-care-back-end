import { Router } from 'express';

import { UploadFile, uploadImageMulter } from '@server/handlers/files';

const uploadRouter = Router();
if (uploadImageMulter) uploadRouter.route('/image').post(uploadImageMulter.single('image'), UploadFile);

export default uploadRouter;
