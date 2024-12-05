import { resolvePath } from '@server/utils/resolvePath';
import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str } from 'envalid';
import { cleanOptions, displayEnvironments } from '../utils/env';

dotenv.config();
const env = cleanEnv(
	process.env,
	{
		// Node Configuration
		NODE_ENV: str({
			default: 'production',
			devDefault: 'development',
			choices: ['development', 'test', 'production'],
		}),
		FY_SHUTDOWN_TIMEOUT: num({
			default: 10000,
			devDefault: 10000,
			desc: 'The maximum time in milliseconds to wait for the server to close all connections before it is forcefully shutdown.',
			docs: 'https://nodejs.org/api/http.html#http_server_close_callback',
			example: '10000',
		}),
		FY_COOKIES_EXPIRE_IN: num({
			default: 1000 * 60 * 60 * 24 * 15, // 15 days
			devDefault: 1000 * 60 * 60 * 24 * 15, // 15 days
			desc: 'The time in milliseconds for the cookies to expire.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
			example: '2592000000',
		}),
		// Server Configuration
		FY_HOST: host({
			default: 'localhost',
			devDefault: 'localhost',
			desc: 'The host to bind the server to.',
			docs: 'https://nodejs.org/api/http.html#http_server_listen',
			example: 'localhost',
		}),
		PORT: port({
			default: 3000,
			devDefault: process.env.NODE_ENV === 'test' ? 3110 : /* istanbul ignore next */ 49544,
			desc: 'The port to bind the server to.',
			docs: 'https://nodejs.org/api/http.html#http_server_listen',
			example: '3000',
		}),
		FY_CORS_ORIGIN: str({
			devDefault: 'http://localhost:*',
			desc: 'The origin to allow CORS requests.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
			example: 'http://localhost:*',
		}),
		// Models settings
		FY_EXPIRE_IN_SECONDS: num({
			default: 300, // 5 minutes
			devDefault: 900, // 15 minutes
			desc: 'The time in seconds for the token to expire.',
			docs: 'https://jwt.io/',
		}),

		// Rate limit
		FY_COMMON_RATE_LIMIT_MAX_REQUESTS: num({
			default: 50,
			devDefault: 100,
			desc: 'The maximum number of requests to allow in the window.',
			docs: 'https://www.npmjs.com/package/express-rate-limit',
			example: '20',
		}),
		FY_COMMON_RATE_LIMIT_WINDOW_MS: num({
			default: 15 * 60 * 1000,
			devDefault: 15 * 60 * 1000,
			desc: 'The time in milliseconds for the window.',
			docs: 'https://www.npmjs.com/package/express-rate-limit',
			example: '900000',
		}),

		// MongoDB Configuration
		FY_MONGODB_DB_URI_WITHOUT_CREDENTIALS: str({
			devDefault: 'mongodb://localhost:27017',
			desc: 'The URI of the MongoDB database without credentials.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'mongodb://localhost:27017',
		}),
		/* FY_MONGODB_DB_HOST: host({
			devDefault: 'localhost',
			desc: 'The host of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'localhost',
		}),
		FY_MONGODB_DB_PORT: port({
			devDefault: 27017,
			desc: 'The port of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: '27017',
		}), */
		FY_MONGODB_DB_DATABASE: str({
			default: 'app',
			devDefault: process.env.NODE_ENV === 'test' ? 'test-app' : /* istanbul ignore next */ 'app',
			desc: 'The name of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'app',
		}),
		FY_MONGODB_DB_USERNAME: str({
			devDefault: undefined,
			desc: 'The username of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'root',
		}),
		FY_MONGODB_DB_PASSWORD: str({
			devDefault: undefined,
			desc: 'The password of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'root',
		}),
		/* // MONGODB ATLAS
		FY_MONGODB_ATLAS_PRODJECT_ID: str({
			desc: 'The project id of the MongoDB Atlas.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'project-id',
		}),
		FY_MONGODB_ATLAS_CLUSTER: str({
			desc: 'The cluster of the MongoDB Atlas.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'cluster-id',
		}),
		FY_MONGODB_ATLAS_PUBLIC_KEY: str({
			desc: 'The public key of the MongoDB Atlas.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'public-key',
		}),
		FY_MONGODB_ATLAS_PRIVATE_KEY: str({
			desc: 'The private key of the MongoDB Atlas.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'private-key',
		}), */
		// Redis Configuration
		/* FY_REDIS_DB_HOST: host({
			default: 'localhost',
			devDefault: 'localhost',
			desc: 'The host of the Redis database.',
			docs: 'https://www.npmjs.com/package/redis',
			example: 'localhost',
		}),
		FY_REDIS_DB_PORT: port({
			default: 6379,
			devDefault: 6379,
			desc: 'The port of the Redis database.',
			docs: 'https://www.npmjs.com/package/redis',
			example: '6379',
		}),
		FY_REDIS_DB_PASSWORD: str({
			default: undefined,
			devDefault: undefined,
			desc: 'The password of the Redis database.',
			docs: 'https://www.npmjs.com/package/redis',
			example: 'root',
		}), */
		// Cloudinary
		/* 	FY_CLOUDINARY_CLOUD_NAME: str({
			desc: 'The cloud name of the cloudinary account.',
			docs: 'https://cloudinary.com/',
			example: 'app',
		}),
		FY_CLOUDINARY_API_KEY: str({
			desc: 'The API key of the cloudinary account.',
			docs: 'https://cloudinary.com/',
			example: 'app',
		}),
		FY_CLOUDINARY_API_SECRET: str({
			desc: 'The API secret of the cloudinary account.',
			docs: 'https://cloudinary.com/',
			example: 'app',
		}), */
		// Security config
		FY_JWT_SECRET: str({
			desc: 'The secret to sign the JWT.',
			docs: 'https://jwt.io/',
			example: 'my-secret-key',
		}),

		FY_MOBILE_AGENT: str({
			default: 'Dart.+',
			devDefault: 'Dart.+|PostmanRuntime.+',
			desc: 'The regular expression to identify mobile agents.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent',
			example: 'Dart.+',
		}),

		// Email configuration
		FY_EMAIL_QUEUE_NAME: str({
			default: 'emailQueue',
			devDefault: 'emailQueue',
			desc: 'The name of the email queue.',
			docs: 'https://www.npmjs.com/package/bull',
			example: 'emailQueue',
		}),
		//  Server fallback

		/* 	FY_MAINTENANCE_PHONE: str({
			default: undefined,
			devDefault: undefined,
			desc: 'The phone to send maintenance notifications.',
			example: '0550000000',
		}), */

		// # Webhooks

		/* FY_MAINTENANCE_DISCORD_WEBHOOK_URL: str({
			desc: 'The Discord webhook URL to send maintenance notifications.',
			example: 'https://discord.com/api/webhooks/...',
			docs: 'https://discord.com/developers/docs/resources/webhook#execute-webhook',
		}),
		FY_MAINTENANCE_DISCORD_WEBHOOK_USERNAME: str({
			default: 'APP SSO',
			devDefault: 'APP SSO',
			desc: 'The Discord webhook username to send maintenance notifications.',
			example: 'APP SSO',
			docs: 'https://discord.com/developers/docs/resources/webhook#execute-webhook',
		}),
		FY_MAINTENANCE_DISCORD_WEBHOOK_AVATAR: str({
			default: 'https://app.net/Logo.svg',
			devDefault: 'https://app.net/Logo.svg',
			desc: 'The Discord webhook avatar to send maintenance notifications.',
			example: 'https://app.net/Logo.svg',
			docs: 'https://discord.com/developers/docs/resources/webhook#execute-webhook',
		}), */
		// public Files and logs
		FY_LOGS_DIR: str({
			default: 'logs',
			devDefault: 'logs',
			desc: 'The directory to store the logs.',
			docs: 'https://www.npmjs.com/package/pino',
			example: 'logs',
		}),
		FY_PUBLIC_DIR: str({
			default: 'public',
			devDefault: 'public',
			desc: 'The directory to store the public files.',
			docs: 'https://expressjs.com/en/starter/static-files.html',
			example: 'public',
		}),
		FY_PUBLIC_CASH_AGE: num({
			default: 31536000,
			devDefault: 0,
			desc: 'The maximum age in seconds for the public files.',
			docs: 'https://expressjs.com/en/starter/static-files.html',
			example: '31536000',
		}),
		FY_TOKEN_NAME: str({
			default: 'app-token',
			devDefault: 'app-token',
			desc: 'The name of the token.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
			example: 'app-token',
		}),
		// domains and subdomains

		/* 	FY_DOMAIN: url({
			desc: 'The domain of the server.',
			docs: 'https://en.wikipedia.org/wiki/Subdomain',
			example: 'https://accounts-back.app.net',
		}), */
		// Google Configuration
		/* FY_GOOGLE_OAUTH2_CLIENT_ID: str({
			desc: 'Google OAuth2 client ID',
			docs: 'https://developers.google.com/identity/protocols/oauth2',
			example: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.google-user-content.com',
		}),
		FY_GOOGLE_OAUTH2_CLIENT_SECRET: str({
			desc: 'Google OAuth2 client secret',
			docs: 'https://developers.google.com/identity/protocols/oauth2',
			example: 'abcdefghijklmnopqrstuvwxyz',
		}),
		FY_GOOGLE_OAUTH2_REDIRECT_URI: str({
			desc: 'Google OAuth2 redirect URI',
			docs: 'https://developers.google.com/identity/protocols/oauth2',
			example: 'https://app.net/auth/google/callback',
		}),
		FY_GOOGLE_LINK_REDIRECT_URI: str({
			default: 'https://app.net/auth/google/callback',
			devDefault: 'https://app.net/auth/google/callback',
			desc: 'Google OAuth2 redirect URI',
			docs: 'https://developers.google.com/identity/protocols/oauth2',
			example: 'https://app.net/auth/google/callback',
		}), */
		/* FY_REPLY_EMAIL: email({
			desc: 'The email to send the emails from',
			example: 'no-reply@mail.com',
		}),
		FY_ENABLE_ONLINE: bool({
			default: true,
			devDefault: true,
			desc: 'Enable online mode',
			docs: 'https://app.net',
			example: 'true',
		}), */
		/* FY_EMAIL_HOST: host({
			devDefault: 'smtp.gmail.com',
			desc: 'The host of the email server.',
			docs: 'https://nodemailer.com/smtp/',
			example: 'smtp.gmail.com',
		}),
		FY_EMAIL_PASSWORD: str({
			desc: 'The password of the email server.',
			docs: 'https://nodemailer.com/smtp/',
			example: 'password',
		}),
		FY_EMAIL_PORT: port({
			devDefault: 465,
			desc: 'The port of the email server.',
			docs: 'https://nodemailer.com/smtp/',
			example: '465',
		}),
		FY_EMAIL_SECURE: bool({
			devDefault: true,
			desc: 'The secure of the email server.',
			docs: 'https://nodemailer.com/smtp/',
			example: 'true',
		}),
		FY_EMAIL_USERNAME: str({
			desc: 'The username of the email server.',
			docs: 'https://nodemailer.com/smtp/',
			example: 'username',
		}), */
	},
	cleanOptions()
);
export default env;

export const FY_PUBLIC_DIR = resolvePath(env.FY_PUBLIC_DIR);
export const FY_LOGS_DIR = resolvePath(env.FY_LOGS_DIR);

console.log({
	FY_PUBLIC_DIR: FY_PUBLIC_DIR,
	FY_LOGS_DIR: FY_LOGS_DIR,
});

export const {
	NODE_ENV,
	FY_SHUTDOWN_TIMEOUT,
	FY_COOKIES_EXPIRE_IN,
	FY_HOST,
	PORT,
	FY_CORS_ORIGIN,
	FY_EXPIRE_IN_SECONDS,
	FY_COMMON_RATE_LIMIT_MAX_REQUESTS,
	FY_COMMON_RATE_LIMIT_WINDOW_MS,
	FY_MONGODB_DB_URI_WITHOUT_CREDENTIALS,
	// mongodb
	/* FY_MONGODB_DB_HOST,
	FY_MONGODB_DB_PORT, */
	FY_MONGODB_DB_DATABASE,
	FY_MONGODB_DB_USERNAME,
	FY_MONGODB_DB_PASSWORD,
	// mongodb atlas
	/* FY_MONGODB_ATLAS_CLUSTER,
	FY_MONGODB_ATLAS_PRIVATE_KEY,
	FY_MONGODB_ATLAS_PRODJECT_ID,
	FY_MONGODB_ATLAS_PUBLIC_KEY, */
	// Redist
	/* FY_REDIS_DB_HOST,
	FY_REDIS_DB_PORT,
	FY_REDIS_DB_PASSWORD, */
	/* 	FY_CLOUDINARY_API_KEY,
	FY_CLOUDINARY_API_SECRET,
	FY_CLOUDINARY_CLOUD_NAME, */
	FY_JWT_SECRET,
	FY_MOBILE_AGENT,
	/* FY_MAINTENANCE_PHONE, */
	/* FY_MAINTENANCE_DISCORD_WEBHOOK_URL,
	FY_MAINTENANCE_DISCORD_WEBHOOK_AVATAR,
	FY_MAINTENANCE_DISCORD_WEBHOOK_USERNAME, */

	FY_PUBLIC_CASH_AGE,
	FY_EMAIL_QUEUE_NAME,
	FY_TOKEN_NAME,
	/* FY_DOMAIN, */
	/* FY_GOOGLE_OAUTH2_CLIENT_ID,
	FY_GOOGLE_OAUTH2_CLIENT_SECRET,
	FY_GOOGLE_OAUTH2_REDIRECT_URI,
	FY_GOOGLE_LINK_REDIRECT_URI, */
	/* FY_REPLY_EMAIL,
	FY_ENABLE_ONLINE, */
	/* FY_EMAIL_HOST,
	FY_EMAIL_PASSWORD,
	FY_EMAIL_PORT,
	FY_EMAIL_SECURE,
	FY_EMAIL_USERNAME, */
	// envalid other properties
	isDev,
	isProd,
	isTest,
} = env;
// display the environments in the console

displayEnvironments(env);
