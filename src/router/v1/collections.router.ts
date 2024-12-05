import { Router } from 'express';

import {
	checkCollectionSlug,
	createCollection,
	deleteCollections,
	getBasicCollections,
	getCollectionById,
	getCollections,
	getDisabledCollections,
	getDraftCollections,
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
collectionsRouter.route('/slug').get(checkCollectionSlug);
collectionsRouter.route('/:collectionId/state').put(updateCollectionState);
collectionsRouter.route('/:collectionId/labels').put(updateCollectionLabels);
collectionsRouter.route('/:collectionId/category').put(updateCollectionParentCollection);
collectionsRouter.route('/:collectionId/images').put(updateCollectionImages);
collectionsRouter.route('/:collectionId/information').put(updateCollectionInformation);
collectionsRouter.route('/:collectionId').get(getCollectionById);

export default collectionsRouter;
