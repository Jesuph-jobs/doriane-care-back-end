import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

import { APP_EXPIRE_IN_SECONDS } from "&server/env";
import { generateOTP } from "@server/utils";

import type {
	OTPSessionDocumentI,
	OTPSessionInstanceMethods,
	OTPSessionKindsI,
	OTPSessionModel,
	OTPSessionQueryHelpers,
	OTPSessionSchemaOptions,
	OTPSessionStaticMethods,
	OTPSessionVirtual,
} from "!server/models/OTPSession";

import userModel from "./user";

const required = true;

const kindEnum: OTPSessionKindsI[] = ["resetPassword", "emailVerification", "phoneVerification"];

/* --------------------- Schema --------------------- */
const otpSessionSchema = new Schema<
	OTPSessionDocumentI,
	OTPSessionModel,
	OTPSessionInstanceMethods,
	OTPSessionQueryHelpers,
	OTPSessionVirtual,
	OTPSessionStaticMethods,
	OTPSessionSchemaOptions
>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required },
		hashedOtp: { type: String, required },
		kind: {
			type: String,
			enum: kindEnum,
			required,
		},
		toValidate: { type: String },
	},
	{ timestamps: true },
);
/* --------------------- Indexes ---------------------  */
otpSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: APP_EXPIRE_IN_SECONDS });
/* --------------------- Virtual ---------------------  */

/* --------------------- Hooks ---------------------  */
otpSessionSchema.pre("save", async function (next) {
	try {
		if (this.isNew || this.isModified("hashedOtp")) {
			this.hashedOtp = await bcrypt.hash(this.hashedOtp, 10);
		}
		next();
	} catch (err) {
		next(err as Error);
	}
});
/* --------------------- Methods ---------------------  */
otpSessionSchema.methods.compareOTP = async function (providedOtp) {
	return bcrypt.compare(providedOtp, this.hashedOtp);
};
/* --------------------- static methods --------------------- */

otpSessionSchema.statics.createRecoverySession = async function (email) {
	const user = await userModel.findByEmail(email);
	if (!user) throw new Error("User not found");
	const otp = generateOTP();
	const otpObject: OTPSessionDocumentI = {
		userId: user._id,
		hashedOtp: otp,
		kind: "resetPassword",
	};
	const newOTPSession = await this.create(otpObject);
	return [otp, newOTPSession, user];
};
otpSessionSchema.statics.createValidationSession = async function (email) {
	const user = await userModel.findByEmail(email);
	if (!user) throw new Error("User not found");
	const otp = generateOTP();
	const otpObject: OTPSessionDocumentI = {
		userId: user._id,
		hashedOtp: otp,
		kind: "emailVerification",
		toValidate: email,
	};
	const newOTPSession = await this.create(otpObject);
	return [otp, newOTPSession, user];
};

otpSessionSchema.statics.getSession = async function (sessionId, OTPCode) {
	const session = await this.findById(sessionId);
	if (!session) throw new Error("Could not find session");
	const user = await userModel.findById(session.userId);
	if (!user) throw new Error("Could not find user");
	if (!(await session.compareOTP(OTPCode))) throw new Error("OTP Invalid");
	return [session, user];
};
otpSessionSchema.statics.getNecessarySession = async function (sessionId, OTPCode, replaceUser = true) {
	const [session, user] = await this.getSession(sessionId, OTPCode);
	return [session, user.toNecessaryUser(replaceUser)];
};
otpSessionSchema.statics.resetPassword = async function (sessionId, password, OTPCode) {
	const [session, user] = await this.getSession(sessionId, OTPCode);
	user.password = password;
	await Promise.all([user.save(), session.deleteOne()]);
};
otpSessionSchema.statics.validateEmail = async function (sessionId, OTPCode) {
	const [session, user] = await this.getSession(sessionId, OTPCode);
	if (!session.toValidate) throw new Error("No email to validate");
	user.contactInformation.validatedEmails.push(session.toValidate);
	await Promise.all([user.save(), session.deleteOne()]);
	return user.toOptimizedObject();
};

/* --------------------- Generate Model --------------------- */
const otpSessionModel = model<OTPSessionDocumentI, OTPSessionModel, OTPSessionQueryHelpers>(
	"OTPSession",
	otpSessionSchema,
);
export default otpSessionModel;
