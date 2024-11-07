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

export type LogVirtual = object;

export interface LogInstanceMethods {}
export type LogQueryHelpers = object;
export interface LogDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<LogDocument, LogI<Types.ObjectId>, ResolveSchemaOptions<LogSchemaOptions>>,
		ResolveSchemaOptions<LogSchemaOptions>
	> {}
export interface LogHydratedDocument
	extends HydratedDocument<FlatRecord<LogDocument>, LogInstanceMethods & LogVirtual, LogQueryHelpers> {}

export interface LogStaticMethods {
	// custom static methods here
}
export interface LogSchemaOptions {
	timestamps: true;
}
export interface LogModel
	extends Model<LogI<Types.ObjectId>, LogQueryHelpers, LogInstanceMethods, LogVirtual, LogHydratedDocument>,
		LogStaticMethods {}
