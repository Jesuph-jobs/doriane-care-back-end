import {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export interface PhoneVirtual {}

export interface PhoneInstanceMethods {
	toOptimizedObject: (this: PhoneHydratedDocument) => PhoneI;
}
/* QueryWithHelpers<PhoneHydratedDocument | null, PhoneHydratedDocument, PhoneQueryHelpers, PhoneDocumentI<ValidationHydratedDocument>,'findOne' >; */
export interface PhoneQueryHelpers {}
export interface PhoneDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<PhoneDocument, PhoneI, ResolveSchemaOptions<PhoneSchemaOptions>>,
		ResolveSchemaOptions<PhoneSchemaOptions>
	> {}
export interface PhoneHydratedDocument
	extends HydratedDocument<FlatRecord<PhoneDocument>, PhoneInstanceMethods & PhoneVirtual, PhoneQueryHelpers> {}

export interface PhoneStaticMethods {
	// custom static methods here
}
export interface PhoneSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface PhoneModel
	extends Model<PhoneI, PhoneQueryHelpers, PhoneInstanceMethods, PhoneVirtual, PhoneHydratedDocument>,
		PhoneStaticMethods {}
