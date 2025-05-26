import { Router } from 'express';

import {
	addCollectionBlog,
	addCollectionProduct,
	checkCollectionSlug,
	createCollection,
	deleteCollectionBlog,
	deleteCollectionProduct,
	deleteCollections,
	getBasicCollections,
	getCollectionById,
	getCollections,
	getDisabledCollections,
	getDraftCollections,
	getSimpleCollections,
	updateCollectionImages,
	updateCollectionInformation,
	updateCollectionLabels,
	updateCollectionParentCollection,
	updateCollectionState,
} from '@server/handlers/collections';

const collectionsRouter = Router();

collectionsRouter.route('/').get(getCollections).post(createCollection).delete(deleteCollections);
collectionsRouter.route('/basics').get(getBasicCollections);
collectionsRouter.route('/drafts').get(getDraftCollections);
collectionsRouter.route('/disabled').get(getDisabledCollections);
collectionsRouter.route('/simple').get(getSimpleCollections);
collectionsRouter.route('/slug').get(checkCollectionSlug);
collectionsRouter.route('/:collectionId/state').put(updateCollectionState);
collectionsRouter.route('/:collectionId/labels').put(updateCollectionLabels);
collectionsRouter.route('/:collectionId/category').put(updateCollectionParentCollection);
collectionsRouter.route('/:collectionId/product').put(addCollectionProduct).delete(deleteCollectionProduct);
collectionsRouter.route('/:collectionId/blog').put(addCollectionBlog).delete(deleteCollectionBlog);
collectionsRouter.route('/:collectionId/images').put(updateCollectionImages);
collectionsRouter.route('/:collectionId/information').put(updateCollectionInformation);
collectionsRouter.route('/:collectionId').get(getCollectionById);

export default collectionsRouter;
