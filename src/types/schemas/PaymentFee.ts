import type {
	ApplySchemaOptions,
	FlatRecord,
	HydratedDocument,
	Model,
	ObtainDocumentType,
	/* QueryWithHelpers, */
	ResolveSchemaOptions,
} from 'mongoose';

export type PaymentFeeVirtual = object;

export interface PaymentFeeInstanceMethods {}
export type PaymentFeeQueryHelpers = object;
export interface PaymentFeeDocument
	extends ApplySchemaOptions<
		ObtainDocumentType<PaymentFeeDocument, PaymentFeeI, ResolveSchemaOptions<PaymentFeeSchemaOptions>>,
		ResolveSchemaOptions<PaymentFeeSchemaOptions>
	> {}
export interface PaymentFeeHydratedDocument
	extends HydratedDocument<
		FlatRecord<PaymentFeeDocument>,
		PaymentFeeInstanceMethods & PaymentFeeVirtual,
		PaymentFeeQueryHelpers
	> {}

export interface PaymentFeeStaticMethods {
	// custom static methods here
}
export interface PaymentFeeSchemaOptions {
	timestamps: false;
}
export interface PaymentFeeModel
	extends Model<
			PaymentFeeI,
			PaymentFeeQueryHelpers,
			PaymentFeeInstanceMethods,
			PaymentFeeVirtual,
			PaymentFeeHydratedDocument
		>,
		PaymentFeeStaticMethods {}
