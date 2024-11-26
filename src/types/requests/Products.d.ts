declare interface UpdateProductInformationShapeI {
	body: ProductInformationI;
	query: any;
	params: {
		productId: string;
	};
}
declare interface GetProductsShapeI {
	body: any;
	query: SortableQuerySearchI<ProductSortableFields>;
}

declare interface GetProductShapeI {
	body: any;
	query: any;
	params: {
		productId: string;
	};
}
declare interface CreateProductShapeI {
	body: ProductI;
	query: any;
}
