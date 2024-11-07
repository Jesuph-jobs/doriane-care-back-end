declare type DiscountValueType =
	| 'P' // 'percentage'
	| 'V'; // 'value';

declare interface DiscountValueI {
	type: DiscountValueType;
	value: number;
}
