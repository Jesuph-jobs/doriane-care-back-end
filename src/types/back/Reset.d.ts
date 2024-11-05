declare interface ResetI<UserID = string> extends TimeStampI, ExpireStampI {
	email: string;
	user: UserID;
}
