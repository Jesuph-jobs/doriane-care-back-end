/**
 * APP JWT Payload
 * @params id: string - The id of the user
 * @params exp: number - The expiration date of the token
 * @params pk: string - The public key of the user
 * @params issAt: number - The issue date of the token
 */
declare interface JWT_Payload {
	id: string;
	issAt: number;
	issBy: string;
	pk: string;
}
