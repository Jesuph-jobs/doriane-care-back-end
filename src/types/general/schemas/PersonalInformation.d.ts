declare type GendersT = 'M' | 'F';
declare type GendersNamesT = 'Male' | 'Female';
declare type HonorificsTypes = 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Prof' | 'CEO' | 'MD' | 'Hon';
declare interface PersonalInformationI {
	honorific?: HonorificsTypes;
	firstName: string;
	lastName: string;
	gender?: GendersT;
	birthday?: Date | string;
	residence?: AddressI;
	note?: string;
}
