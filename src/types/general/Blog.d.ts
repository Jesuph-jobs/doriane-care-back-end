declare interface BlogI<ID = string> extends PublishableContentI<ID> {
	content: string; // Markdown format
	author: PersonalInformationI;
	category: ID;
	views: number;
	ratingAggregation: RatingAggregationI;
}

declare interface BlogDocumentI<ID = string> extends BlogI<ID> {}
declare interface PublicBlogI<ID = string> extends BlogI<ID> {
	id: ID;
}
