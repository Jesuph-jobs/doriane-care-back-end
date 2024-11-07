declare interface MyFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	path: string;
	size: number;
	filename: string;
}

type MyEnum<U extends string> = Readonly<[U, ...U[]]>;
type Optional<T> = {
	[P in keyof T]?: T[P];
};
