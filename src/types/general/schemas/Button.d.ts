declare type ButtonType = 'primary' | 'secondary' | 'success' | 'error' | 'warning';
declare type ButtonIconType =
	| 'arrow'
	| 'cart'
	| 'heart'
	| 'search'
	| 'user'
	| 'close'
	| 'menu'
	| 'plus'
	| 'minus'
	| 'check'
	| 'edit'
	| 'trash'
	| 'eye'
	| 'eye-slash';
declare interface ButtonI<ID = string> {
	link: LinkI<ID>;
	type: ButtonType;
	icon?: {
		left?: ButtonIconType;
		right?: ButtonIconType;
	};
	text: string;
}
