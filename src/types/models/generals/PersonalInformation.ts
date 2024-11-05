import {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export interface PersonalInformationVirtual {}

export interface PersonalInformationInstanceMethods {
	toOptimizedObject: (this: PersonalInformationHydratedDocument) => PersonalInformationI;
}
/* QueryWithHelpers<PersonalInformationHydratedDocument | null, PersonalInformationHydratedDocument, PersonalInformationQueryHelpers, PersonalInformationDocumentI<ValidationHydratedDocument>,'findOne' >; */
export interface PersonalInformationQueryHelpers {}
export interface PersonalInformationDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<
			PersonalInformationDocument,
			PersonalInformationI,
			ResolveSchemaOptions<PersonalInformationSchemaOptions>
		>,
		ResolveSchemaOptions<PersonalInformationSchemaOptions>
	> {}
export interface PersonalInformationHydratedDocument
	extends HydratedDocument<
		FlatRecord<PersonalInformationDocument>,
		PersonalInformationInstanceMethods & PersonalInformationVirtual,
		PersonalInformationQueryHelpers
	> {}

export interface PersonalInformationStaticMethods {
	// custom static methods here
}
export interface PersonalInformationSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface PersonalInformationModel
	extends Model<
			PersonalInformationI,
			PersonalInformationQueryHelpers,
			PersonalInformationInstanceMethods,
			PersonalInformationVirtual,
			PersonalInformationHydratedDocument
		>,
		PersonalInformationStaticMethods {}
