import {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export interface ContactInformationVirtual {}

export interface ContactInformationInstanceMethods {
	toOptimizedObject: (this: ContactInformationHydratedDocument) => ContactInformationI;
}
/* QueryWithHelpers<ContactInformationHydratedDocument | null, ContactInformationHydratedDocument, ContactInformationQueryHelpers, ContactInformationDocumentI<ValidationHydratedDocument>,'findOne' >; */
export interface ContactInformationQueryHelpers {}
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

export interface ContactInformationStaticMethods {
	// custom static methods here
}
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
