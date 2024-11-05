type MainLanguagesI = 'FR' | 'AR';
type SecondaryLanguagesI = 'EN';

type LanguagesI = MainLanguagesI | SecondaryLanguagesI;
declare type LanguagesContentI<T = string> = {
	[key in MainLanguagesI]: T;
} & {
	[key in SecondaryLanguagesI]?: T;
};
