declare interface BasicQuerySearchI<T extends NonNullable<object> = object> {
	search?: string;
	page?: number;
	limit?: number;
	sort?: Record<keyof T, 1 | -1>;
	select?: string | Record<keyof T, 1 | -1>;
}
declare type QuerySearchI<
	T extends NonNullable<object>,
	AdditionalT extends NonNullable<object> = object,
> = BasicQuerySearchI<T> & AdditionalT;
declare interface ListResponse<T extends NonNullable<object>> {
	data: T[];
	total: number;
	page?: number;
	limit?: number;
}
