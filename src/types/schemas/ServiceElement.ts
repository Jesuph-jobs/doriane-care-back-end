import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ServiceElementVirtual = object;

export interface ServiceElementInstanceMethods {}
export type ServiceElementQueryHelpers = object;
export interface ServiceElementDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<ServiceElementDocument, ServiceElementI, ResolveSchemaOptions<ServiceElementSchemaOptions>>,
		ResolveSchemaOptions<ServiceElementSchemaOptions>
	> {}
export interface ServiceElementHydratedDocument
	extends HydratedDocument<
		FlatRecord<ServiceElementDocument>,
		ServiceElementInstanceMethods & ServiceElementVirtual,
		ServiceElementQueryHelpers
	> {}

export interface ServiceElementStaticMethods {
	// custom static methods here
}
export interface ServiceElementSchemaOptions {
	timestamps: true;
}
export interface ServiceElementModel
	extends Model<
			ServiceElementI,
			ServiceElementQueryHelpers,
			ServiceElementInstanceMethods,
			ServiceElementVirtual,
			ServiceElementHydratedDocument
		>,
		ServiceElementStaticMethods {}
