import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type PersonalInformationVirtual = object;

export interface PersonalInformationInstanceMethods {
	toOptimizedObject: (this: PersonalInformationHydratedDocument) => PersonalInformationI;
}
export type PersonalInformationQueryHelpers = object;
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

export type PersonalInformationStaticMethods = object;
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
