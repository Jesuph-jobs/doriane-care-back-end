declare interface UserI {
	profilePicture?: string;
	personalInformation: PersonalInformationI;
	//username: string;
	email: string;
	phone: string;
	password: string;
}
declare interface PublicUserI extends Omit<UserI, "password"> {
	id: string;
	emailValidated: boolean;
}
declare interface NecessaryUserI extends Omit<UserI, "password"> {
	id: string;
}
declare interface AppDetailsI {
	id: string;
	username?: string;
}
declare type EnabledUserAppsEnum = "google";
declare type DisabledUserAppsEnum = "facebook" | "twitter" | "github";
declare type UserAppsEnum = EnabledUserAppsEnum | DisabledUserAppsEnum;
declare type EnabledUserAppsI<T = string> = Record<EnabledUserAppsEnum, T>;
declare type DisabledUserAppsI<T = string> = Record<DisabledUserAppsEnum, T>;
declare type UserAppsI<T = string> = EnabledUserAppsI<T> & DisabledUserAppsI<T>;
interface UserDocumentI extends UserI {
	contactInformation: ContactInformationI;
	enabled: boolean;
	lastLogin: Date | string;
	apps: Partial<EnabledUserAppsI<AppDetailsI>>;
}

interface ChangePasswordI {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}
