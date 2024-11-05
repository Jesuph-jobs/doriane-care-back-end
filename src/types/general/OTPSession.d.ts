declare interface OTPSessionI {
	// username or email
	email: string;
}
declare interface OTPSessionSendI {
	sessionId: string;
	otpCode: string;
}
declare interface ResetPasswordI {
	sessionId: string;
	otpCode: string;
	password: string;
	confirmPassword: string;
}
declare interface OTPSessionResponseI {
	sessionId: string;
	user: NecessaryUserI;
}
