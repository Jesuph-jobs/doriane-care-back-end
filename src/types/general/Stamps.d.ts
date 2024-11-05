declare interface TimeStampI<T extends string | Date = string> {
	createdAt: T;
	updatedAt: T;
}
declare interface ExpireStampI {
	deleteAt: Date;
}
