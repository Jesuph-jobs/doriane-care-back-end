import generatePassword from 'generate-password';
export const emailReplaceCallback: (substring: string, ...args: any[]) => string = (sub, $1, $2, $3, $4) =>
	!$1 || !$3 || !$4 ? sub : `${$1}${'*'.repeat($2?.length || 0)}@${'*'.repeat($3.length)}.${$4}`;
/**
 * Replaces characters in the email address with asterisks (*) to obfuscate it.
 * @param email - The email address to obfuscate.
 * @returns The obfuscated email address.
 */
export function replaceEmail(email: string): string {
	return email.replace(/(.{1,4})(.+)?@(.*)?\.(?:[^.]+\.)?([^.\s]+)/, emailReplaceCallback);
}
/**
 * Replaces the middle digits of a phone number with asterisks.
 * @param phone - The phone number to be modified.
 * @returns The modified phone number with asterisks replacing the middle digits.
 */
export function replacePhone(phone: string): string {
	return phone.replace(/^(00213|\+213|0)(5|6|7)([0-9])[0-9]{5}([0-9]{2})$/, '$1$2$3*****$4');
}

export function generateToken(layersNumber = 1) {
	return () =>
		Array(layersNumber)
			.fill(0)
			.map(() => Math.random().toString(36).substring(2, 15))
			.join('');
}
export function generateOTP() {
	return Math.floor(100000 + Math.random() * 999999)
		.toString()
		.substring(0, 6);
}
export function generateStrongPassword() {
	return generatePassword.generate({
		length: 20,
		numbers: true,
		symbols: true,
		uppercase: true,
		lowercase: true,
		strict: true,
	});
}
