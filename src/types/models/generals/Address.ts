import {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export interface AddressVirtual {}

export interface AddressInstanceMethods {
	toOptimizedObject: (this: AddressHydratedDocument) => AddressI;
}
/* QueryWithHelpers<AddressHydratedDocument | null, AddressHydratedDocument, AddressQueryHelpers, AddressDocumentI<ValidationHydratedDocument>,'findOne' >; */
export interface AddressQueryHelpers {}
export interface AddressDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<AddressDocument, AddressI, ResolveSchemaOptions<AddressSchemaOptions>>,
		ResolveSchemaOptions<AddressSchemaOptions>
	> {}
export interface AddressHydratedDocument
	extends HydratedDocument<
		FlatRecord<AddressDocument>,
		AddressInstanceMethods & AddressVirtual,
		AddressQueryHelpers
	> {}

export interface AddressStaticMethods {
	// custom static methods here
}
export interface AddressSchemaOptions {
	timestamps: false;
	_id: false;
}
export interface AddressModel
	extends Model<AddressI, AddressQueryHelpers, AddressInstanceMethods, AddressVirtual, AddressHydratedDocument>,
		AddressStaticMethods {}
