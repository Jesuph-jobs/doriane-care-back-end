import { Router } from 'express';

import { UploadFile, upload } from '@server/handlers/files';

const filesRouter = Router();
if (upload) filesRouter.route('/').post(upload.single('image'), UploadFile);

export default filesRouter;
