import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type UnitedValueVirtual = object;

export interface UnitedValueInstanceMethods {}
export type UnitedValueQueryHelpers = object;
export interface UnitedValueDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<UnitedValueDocument, UnitedValueI, ResolveSchemaOptions<UnitedValueSchemaOptions>>,
		ResolveSchemaOptions<UnitedValueSchemaOptions>
	> {}
export interface UnitedValueHydratedDocument
	extends HydratedDocument<
		FlatRecord<UnitedValueDocument>,
		UnitedValueInstanceMethods & UnitedValueVirtual,
		UnitedValueQueryHelpers
	> {}

export interface UnitedValueStaticMethods {
	// custom static methods here
}
export interface UnitedValueSchemaOptions {
	timestamps: true;
}
export interface UnitedValueModel
	extends Model<
			UnitedValueI,
			UnitedValueQueryHelpers,
			UnitedValueInstanceMethods,
			UnitedValueVirtual,
			UnitedValueHydratedDocument
		>,
		UnitedValueStaticMethods {}
