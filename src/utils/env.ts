/* eslint-disable no-console */
import type { CleanOptions } from 'envalid';

export const cleanOptions: <T extends object>() => CleanOptions<T> = () => ({
	reporter: ({ errors }) => {
		if (Object.keys(errors).length > 0) {
			for (const key in errors) console.error(`❌ ${key} is required: ${errors[key as keyof typeof errors]}`);
			process.exit(50);
		}
	},
});
export function displayEnvironments<T extends { isDev: boolean }>(env: T) {
	if (env.isDev) {
		console.log('🔧 Development Configuration:');
		for (const key in env) {
			console.log(`🟢 ${key}: ${env[key as keyof typeof env]}`);
		}
	}
}
