import { Router } from 'express';

import {
	checkCategorySlug,
	createCategory,
	deleteCategories,
	getBasicCategories,
	getCategories,
	getCategoryById,
	getDisabledCategories,
	getDraftCategories,
	getSimpleCategories,
	updateCategoryImages,
	updateCategoryInformation,
	updateCategoryLabels,
	updateCategoryParentCategory,
	updateCategoryState,
} from '@server/handlers/categories';

const categoriesRouter = Router();

categoriesRouter.route('/').get(getCategories).post(createCategory).delete(deleteCategories);
categoriesRouter.route('/basics').get(getBasicCategories);
categoriesRouter.route('/drafts').get(getDraftCategories);
categoriesRouter.route('/disabled').get(getDisabledCategories);
categoriesRouter.route('/simple').get(getSimpleCategories);
categoriesRouter.route('/slug').get(checkCategorySlug);
categoriesRouter.route('/:categoryId/state').put(updateCategoryState);
categoriesRouter.route('/:categoryId/labels').put(updateCategoryLabels);
categoriesRouter.route('/:categoryId/category').put(updateCategoryParentCategory);
categoriesRouter.route('/:categoryId/images').put(updateCategoryImages);
categoriesRouter.route('/:categoryId/information').put(updateCategoryInformation);
categoriesRouter.route('/:categoryId').get(getCategoryById);

export default categoriesRouter;
