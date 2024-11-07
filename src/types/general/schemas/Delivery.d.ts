declare type DeliveryChoiceTypes = 'desk' | 'door';

declare interface DeliveryI {
	address: AddressI;
	deliveryChoice: DeliveryChoiceTypes;
	cost: number;
}
