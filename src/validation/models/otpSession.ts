import { type MyZodType, z } from '^common/defaultZod';
import { emailSchema, mongoIDSchema, otpSchema, passwordSchema } from '^common/elements';

import { NecessaryUserSchema } from './user';

export const OTPSessionSchema = ({ email }: Partial<Record<keyof OTPSessionI, ErrorsSchemaMsgI>> = {}) =>
	z
		.object<MyZodType<OTPSessionI>>(
			{
				email: emailSchema(email),
			},
			{
				description: 'Un schéma de session de récupération',
				invalid_type_error: 'La session de récupération doit être un objet',
				required_error: 'La session de récupération est requise',
			}
		)
		.openapi('Recovery_Session', { description: 'Un schéma de session de récupération' });

export const OTPSessionSendSchema = () =>
	z
		.object<MyZodType<OTPSessionSendI>>(
			{
				otpCode: otpSchema({
					description: 'Le code OTP',
					required: 'Le code OTP est requis',
				}),
				sessionId: mongoIDSchema({
					description: "L'identifiant de session",
					required: "L'identifiant de session est requis",
				}),
			},
			{
				description: "Un schéma de demande d'envoi de session de récupération",
				invalid_type_error: "La demande d'envoi de session de récupération doit être un objet",
				required_error: "La demande d'envoi de session de récupération est requise",
			}
		)
		.openapi('Recovery_Session_Send', { description: "Un schéma de demande d'envoi de session de récupération" });

export const ResetPasswordSchema = ({
	confirmPassword,
	password,
	otpCode,
	sessionId,
}: Partial<Record<keyof ResetPasswordI, ErrorsSchemaMsgI>> = {}) => {
	return z
		.object<MyZodType<ResetPasswordI>>({
			sessionId: mongoIDSchema({
				description: "L'identifiant de session",
				required: "L'identifiant de session est requis",
				...(sessionId || null),
			}),
			password: passwordSchema({
				description: 'Le mot de passe',
				required: 'Le mot de passe est requis',
				...(password || null),
			}),
			confirmPassword: passwordSchema({
				description: 'La confirmation du mot de passe',
				required: 'La confirmation du mot de passe est requise',
				...(confirmPassword || null),
			}),
			otpCode: otpSchema({
				description: 'Le code OTP',
				required: 'Le code OTP est requis',
				...(otpCode || null),
			}),
		})
		.openapi('Reset_Password', { description: 'Un schéma de demande de réinitialisation de mot de passe' })
		.superRefine((data, ctx) => {
			if (data.password !== data.confirmPassword) {
				return ctx.addIssue({
					code: 'custom',
					message: 'Le mot de passe et la confirmation du mot de passe doivent correspondre',
					path: ['confirmPassword'],
				});
			}
		});
};
// OTPSessionResponseI
export const OTPSessionResponseSchema = () =>
	z
		.object<MyZodType<OTPSessionResponseI>>(
			{
				sessionId: mongoIDSchema({
					description: "L'identifiant de session",
					required: "L'identifiant de session est requis",
				}),
				user: NecessaryUserSchema(),
			},
			{
				description: 'Un schéma de réponse de session de récupération',
				invalid_type_error: 'La réponse de session de récupération doit être un objet',
				required_error: 'La réponse de session de récupération est requise',
			}
		)
		.openapi('Recovery_Session_Response', { description: 'Un schéma de réponse de session de récupération' });
