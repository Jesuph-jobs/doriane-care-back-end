declare interface UserLogInI {
	email: string;
	password: string;
	stay?: boolean;
}
declare interface UserAuthI {
	user: PublicUserI;
	new?: boolean;
	token?: string;
}
declare type UserTokenI = string;

declare interface UserRegistrationI extends UserI {}
declare interface RegisterFormI extends UserRegistrationI {
	confirmPassword: string;
}

declare type UserGoogleRegistrationI = AppDetailsI;
declare type ValidationKeysI = "email" | "phone";
declare type ValidatedElementsI<T extends Omit<ValidationI, "updatedAt"> = Omit<ValidationI, "updatedAt">> = Record<
	ValidationKeysI,
	T
>;

/* ----------------------- Google auth -----------------------*/
declare type GoogleAuthorizationUrlRequestI = object;
declare interface GoogleLogOnI {
	code: string;
}
