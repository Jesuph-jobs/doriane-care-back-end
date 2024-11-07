declare interface DeliverySettingsI<ID = string> {
	zones: number[];
	fees: PaymentFeeI[];
	defaultFee: PaymentFeeI;
	link: LinkI<ID>;
}

declare interface DeliverySettingsDocumentI<ID = string> extends DeliverySettingsI<ID> {}
declare interface PublicDeliverySettingsI<ID = string> extends DeliverySettingsI<ID> {
	id: ID;
}
