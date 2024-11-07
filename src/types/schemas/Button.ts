import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ButtonVirtual = object;

export interface ButtonInstanceMethods {}
export type ButtonQueryHelpers = object;
export interface ButtonDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ButtonDocument, ButtonI, ResolveSchemaOptions<ButtonSchemaOptions>>,
		ResolveSchemaOptions<ButtonSchemaOptions>
	> {}
export interface ButtonHydratedDocument
	extends HydratedDocument<FlatRecord<ButtonDocument>, ButtonInstanceMethods & ButtonVirtual, ButtonQueryHelpers> {}

export interface ButtonStaticMethods {
	// custom static methods here
}
export interface ButtonSchemaOptions {
	timestamps: true;
}
export interface ButtonModel
	extends Model<ButtonI, ButtonQueryHelpers, ButtonInstanceMethods, ButtonVirtual, ButtonHydratedDocument>,
		ButtonStaticMethods {}
export const buttonTypesEnum = ['primary', 'secondary', 'success', 'error', 'warning'];
export const buttonIconTypesEnum = [
	'arrow',
	'cart',
	'heart',
	'search',
	'user',
	'close',
	'menu',
	'plus',
	'minus',
	'check',
	'edit',
	'trash',
	'eye',
	'eye-slash',
];
