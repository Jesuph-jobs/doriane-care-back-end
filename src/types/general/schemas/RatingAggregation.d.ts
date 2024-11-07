declare interface RatingAggregationI {
	average: number;
	count: number;
	distribution: [number, number, number, number, number]; // Array with 5 elements [1-star, 2-star, 3-star, 4-star, 5-star]
}
