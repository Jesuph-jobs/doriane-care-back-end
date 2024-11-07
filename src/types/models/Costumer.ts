import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
	Types,
} from 'mongoose';

export type CostumerVirtual = object;

export interface CostumerInstanceMethods {
	toOptimizedObject: (this: CostumerHydratedDocument) => PublicCostumerI;
}
export type CostumerQueryHelpers = object;
export interface CostumerDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			CostumerDocument,
			CostumerDocumentI<Types.ObjectId>,
			ResolveSchemaOptions<CostumerSchemaOptions>
		>,
		ResolveSchemaOptions<CostumerSchemaOptions>
	> {}
export interface CostumerHydratedDocument
	extends HydratedDocument<
		FlatRecord<CostumerDocument>,
		CostumerInstanceMethods & CostumerVirtual,
		CostumerQueryHelpers
	> {}

export interface CostumerStaticMethods {
	// custom static methods here
}
export interface CostumerSchemaOptions {
	timestamps: true;
}
export interface CostumerModel
	extends Model<
			CostumerDocumentI<Types.ObjectId>,
			CostumerQueryHelpers,
			CostumerInstanceMethods,
			CostumerVirtual,
			CostumerHydratedDocument
		>,
		CostumerStaticMethods {}
