import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type ContactInformationVirtual = object;

export interface ContactInformationInstanceMethods {
	toOptimizedObject: (this: ContactInformationHydratedDocument) => ContactInformationI;
}
export type ContactInformationQueryHelpers = object;
export interface ContactInformationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			ContactInformationDocument,
			ContactInformationI,
			ResolveSchemaOptions<ContactInformationSchemaOptions>
		>,
		ResolveSchemaOptions<ContactInformationSchemaOptions>
	> {}
export interface ContactInformationHydratedDocument
	extends HydratedDocument<
		FlatRecord<ContactInformationDocument>,
		ContactInformationInstanceMethods & ContactInformationVirtual,
		ContactInformationQueryHelpers
	> {}

export type ContactInformationStaticMethods = object;
export interface ContactInformationSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface ContactInformationModel
	extends Model<
			ContactInformationI,
			ContactInformationQueryHelpers,
			ContactInformationInstanceMethods,
			ContactInformationVirtual,
			ContactInformationHydratedDocument
		>,
		ContactInformationStaticMethods {}
