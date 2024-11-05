import dotenv from "dotenv";
import { url, bool, cleanEnv, email, host, num, port, str } from "envalid";

import { cleanOptions, displayEnvironments } from "../utils/env";

dotenv.config();
const env = cleanEnv(
	process.env,
	{
		// Node Configuration
		NODE_ENV: str({
			default: "production",
			devDefault: "development",
			choices: ["development", "test", "production"],
		}),
		APP_SHUTDOWN_TIMEOUT: num({
			default: 10000,
			devDefault: 10000,
			desc: "The maximum time in milliseconds to wait for the server to close all connections before it is forcefully shutdown.",
			docs: "https://nodejs.org/api/http.html#http_server_close_callback",
			example: "10000",
		}),
		APP_COOKIES_EXPIRE_IN: num({
			default: 1000 * 60 * 60 * 24 * 15, // 15 days
			devDefault: 1000 * 60 * 60 * 24 * 15, // 15 days
			desc: "The time in milliseconds for the cookies to expire.",
			docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies",
			example: "2592000000",
		}),
		// Server Configuration
		APP_HOST: host({
			default: "localhost",
			devDefault: "localhost",
			desc: "The host to bind the server to.",
			docs: "https://nodejs.org/api/http.html#http_server_listen",
			example: "localhost",
		}),
		PORT: port({
			default: 3000,
			devDefault: process.env.NODE_ENV === "test" ? 3110 : /* istanbul ignore next */ 49544,
			desc: "The port to bind the server to.",
			docs: "https://nodejs.org/api/http.html#http_server_listen",
			example: "3000",
		}),
		APP_CORS_ORIGIN: str({
			devDefault: "http://localhost:*",
			desc: "The origin to allow CORS requests.",
			docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
			example: "http://localhost:*",
		}),
		// Models settings
		APP_EXPIRE_IN_SECONDS: num({
			default: 300, // 5 minutes
			devDefault: 900, // 15 minutes
			desc: "The time in seconds for the token to expire.",
			docs: "https://jwt.io/",
		}),

		// Rate limit
		APP_COMMON_RATE_LIMIT_MAX_REQUESTS: num({
			default: 20,
			devDefault: 100,
			desc: "The maximum number of requests to allow in the window.",
			docs: "https://www.npmjs.com/package/express-rate-limit",
			example: "20",
		}),
		APP_COMMON_RATE_LIMIT_WINDOW_MS: num({
			default: 15 * 60 * 1000,
			devDefault: 15 * 60 * 1000,
			desc: "The time in milliseconds for the window.",
			docs: "https://www.npmjs.com/package/express-rate-limit",
			example: "900000",
		}),

		// MongoDB Configuration
		APP_MONGODB_DB_URI_WITHOUT_CREDENTIALS: str({
			devDefault: "mongodb://localhost:27017",
			desc: "The URI of the MongoDB database without credentials.",
			docs: "https://www.npmjs.com/package/mongoose",
			example: "mongodb://localhost:27017",
		}),
		/* APP_MONGODB_DB_HOST: host({
			devDefault: 'localhost',
			desc: 'The host of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'localhost',
		}),
		APP_MONGODB_DB_PORT: port({
			devDefault: 27017,
			desc: 'The port of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: '27017',
		}), */
		APP_MONGODB_DB_DATABASE: str({
			default: "app",
			devDefault: process.env.NODE_ENV === "test" ? "test-app" : /* istanbul ignore next */ "app",
			desc: "The name of the MongoDB database.",
			docs: "https://www.npmjs.com/package/mongoose",
			example: "app",
		}),
		APP_MONGODB_DB_USERNAME: str({
			devDefault: undefined,
			desc: "The username of the MongoDB database.",
			docs: "https://www.npmjs.com/package/mongoose",
			example: "root",
		}),
		APP_MONGODB_DB_PASSWORD: str({
			devDefault: undefined,
			desc: "The password of the MongoDB database.",
			docs: "https://www.npmjs.com/package/mongoose",
			example: "root",
		}),

		// Redis Configuration
		APP_REDIS_DB_HOST: host({
			default: "localhost",
			devDefault: "localhost",
			desc: "The host of the Redis database.",
			docs: "https://www.npmjs.com/package/redis",
			example: "localhost",
		}),
		APP_REDIS_DB_PORT: port({
			default: 6379,
			devDefault: 6379,
			desc: "The port of the Redis database.",
			docs: "https://www.npmjs.com/package/redis",
			example: "6379",
		}),
		APP_REDIS_DB_PASSWORD: str({
			default: undefined,
			devDefault: undefined,
			desc: "The password of the Redis database.",
			docs: "https://www.npmjs.com/package/redis",
			example: "root",
		}),
		// Cloudinary
		/* 	APP_CLOUDINARY_CLOUD_NAME: str({
			desc: 'The cloud name of the cloudinary account.',
			docs: 'https://cloudinary.com/',
			example: 'app',
		}),
		APP_CLOUDINARY_API_KEY: str({
			desc: 'The API key of the cloudinary account.',
			docs: 'https://cloudinary.com/',
			example: 'app',
		}),
		APP_CLOUDINARY_API_SECRET: str({
			desc: 'The API secret of the cloudinary account.',
			docs: 'https://cloudinary.com/',
			example: 'app',
		}), */
		// Security config
		APP_JWT_SECRET: str({
			desc: "The secret to sign the JWT.",
			docs: "https://jwt.io/",
			example: "my-secret-key",
		}),
		APP_JWT_SECRET_OAUTH: str({
			desc: "The secret to sign the JWT for OAuth.",
			docs: "https://jwt.io/",
			example: "my-oauth-secret-key",
		}),
		APP_MOBILE_AGENT: str({
			default: "Dart.+",
			devDefault: "Dart.+|PostmanRuntime.+",
			desc: "The regular expression to identify mobile agents.",
			docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent",
			example: "Dart.+",
		}),

		// Email configuration
		APP_EMAIL_QUEUE_NAME: str({
			default: "emailQueue",
			devDefault: "emailQueue",
			desc: "The name of the email queue.",
			docs: "https://www.npmjs.com/package/bull",
			example: "emailQueue",
		}),
		//  Server fallback
		APP_MAINTENANCE_EMAIL: str({
			default: undefined,
			devDefault: undefined,
			desc: "The email to send maintenance notifications.",
			example: "email@mail.com",
		}),
		APP_MAINTENANCE_PHONE: str({
			default: undefined,
			devDefault: undefined,
			desc: "The phone to send maintenance notifications.",
			example: "0550000000",
		}),

		// # Webhooks

		APP_MAINTENANCE_DISCORD_WEBHOOK_URL: str({
			desc: "The Discord webhook URL to send maintenance notifications.",
			example: "https://discord.com/api/webhooks/...",
			docs: "https://discord.com/developers/docs/resources/webhook#execute-webhook",
		}),
		APP_MAINTENANCE_DISCORD_WEBHOOK_USERNAME: str({
			default: "APP SSO",
			devDefault: "APP SSO",
			desc: "The Discord webhook username to send maintenance notifications.",
			example: "APP SSO",
			docs: "https://discord.com/developers/docs/resources/webhook#execute-webhook",
		}),
		APP_MAINTENANCE_DISCORD_WEBHOOK_AVATAR: str({
			default: "https://app.net/Logo.svg",
			devDefault: "https://app.net/Logo.svg",
			desc: "The Discord webhook avatar to send maintenance notifications.",
			example: "https://app.net/Logo.svg",
			docs: "https://discord.com/developers/docs/resources/webhook#execute-webhook",
		}),
		// public Files and logs
		APP_LOGS_DIR: str({
			default: "logs",
			devDefault: "logs",
			desc: "The directory to store the logs.",
			docs: "https://www.npmjs.com/package/pino",
			example: "logs",
		}),
		APP_PUBLIC_DIR: str({
			default: "public",
			devDefault: "public",
			desc: "The directory to store the public files.",
			docs: "https://expressjs.com/en/starter/static-files.html",
			example: "public",
		}),
		APP_PUBLIC_CASH_AGE: num({
			default: 31536000,
			devDefault: 0,
			desc: "The maximum age in seconds for the public files.",
			docs: "https://expressjs.com/en/starter/static-files.html",
			example: "31536000",
		}),
		APP_TOKEN_NAME: str({
			default: "app-token",
			devDefault: "app-token",
			desc: "The name of the token.",
			docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies",
			example: "app-token",
		}),
		// domains and subdomains

		APP_DOMAIN: url({
			desc: "The domain of the server.",
			docs: "https://en.wikipedia.org/wiki/Subdomain",
			example: "https://accounts-back.app.net",
		}),
		// Google Configuration
		APP_GOOGLE_OAUTH2_CLIENT_ID: str({
			desc: "Google OAuth2 client ID",
			docs: "https://developers.google.com/identity/protocols/oauth2",
			example: "1234567890-abcdefghijklmnopqrstuvwxyz.apps.google-user-content.com",
		}),
		APP_GOOGLE_OAUTH2_CLIENT_SECRET: str({
			desc: "Google OAuth2 client secret",
			docs: "https://developers.google.com/identity/protocols/oauth2",
			example: "abcdefghijklmnopqrstuvwxyz",
		}),
		APP_GOOGLE_OAUTH2_REDIRECT_URI: str({
			desc: "Google OAuth2 redirect URI",
			docs: "https://developers.google.com/identity/protocols/oauth2",
			example: "https://app.net/auth/google/callback",
		}),
		APP_GOOGLE_LINK_REDIRECT_URI: str({
			desc: "Google OAuth2 redirect URI",
			docs: "https://developers.google.com/identity/protocols/oauth2",
			example: "https://app.net/auth/google/callback",
		}),
		APP_NOREPLY_EMAIL: email({
			desc: "The email to send the emails from",
			example: "no-reply@mail.com",
		}),
		APP_ENABLE_ONLINE: bool({
			default: true,
			devDefault: true,
			desc: "Enable online mode",
			docs: "https://app.net",
			example: "true",
		}),
		APP_EMAIL_HOST: host({
			devDefault: "smtp.gmail.com",
			desc: "The host of the email server.",
			docs: "https://nodemailer.com/smtp/",
			example: "smtp.gmail.com",
		}),
		APP_EMAIL_PASSWORD: str({
			desc: "The password of the email server.",
			docs: "https://nodemailer.com/smtp/",
			example: "password",
		}),
		APP_EMAIL_PORT: port({
			devDefault: 465,
			desc: "The port of the email server.",
			docs: "https://nodemailer.com/smtp/",
			example: "465",
		}),
		APP_EMAIL_SECURE: bool({
			devDefault: true,
			desc: "The secure of the email server.",
			docs: "https://nodemailer.com/smtp/",
			example: "true",
		}),
		APP_EMAIL_USERNAME: str({
			desc: "The username of the email server.",
			docs: "https://nodemailer.com/smtp/",
			example: "username",
		}),
	},
	cleanOptions(),
);
export default env;

export const {
	NODE_ENV,
	APP_SHUTDOWN_TIMEOUT,
	APP_COOKIES_EXPIRE_IN,
	APP_HOST,
	PORT,
	APP_CORS_ORIGIN,
	APP_EXPIRE_IN_SECONDS,
	APP_COMMON_RATE_LIMIT_MAX_REQUESTS,
	APP_COMMON_RATE_LIMIT_WINDOW_MS,
	APP_MONGODB_DB_URI_WITHOUT_CREDENTIALS,
	/* APP_MONGODB_DB_HOST,
	APP_MONGODB_DB_PORT, */
	APP_MONGODB_DB_DATABASE,
	APP_MONGODB_DB_USERNAME,
	APP_MONGODB_DB_PASSWORD,
	APP_REDIS_DB_HOST,
	APP_REDIS_DB_PORT,
	APP_REDIS_DB_PASSWORD,
	/* 	APP_CLOUDINARY_API_KEY,
	APP_CLOUDINARY_API_SECRET,
	APP_CLOUDINARY_CLOUD_NAME, */
	APP_JWT_SECRET,
	APP_JWT_SECRET_OAUTH,
	APP_MOBILE_AGENT,
	APP_MAINTENANCE_EMAIL,
	APP_MAINTENANCE_PHONE,
	APP_MAINTENANCE_DISCORD_WEBHOOK_URL,
	APP_MAINTENANCE_DISCORD_WEBHOOK_AVATAR,
	APP_MAINTENANCE_DISCORD_WEBHOOK_USERNAME,
	APP_LOGS_DIR,
	APP_PUBLIC_DIR,
	APP_PUBLIC_CASH_AGE,
	APP_EMAIL_QUEUE_NAME,
	APP_TOKEN_NAME,
	APP_DOMAIN,
	APP_GOOGLE_OAUTH2_CLIENT_ID,
	APP_GOOGLE_OAUTH2_CLIENT_SECRET,
	APP_GOOGLE_OAUTH2_REDIRECT_URI,
	APP_GOOGLE_LINK_REDIRECT_URI,
	APP_NOREPLY_EMAIL,
	APP_ENABLE_ONLINE,
	APP_EMAIL_HOST,
	APP_EMAIL_PASSWORD,
	APP_EMAIL_PORT,
	APP_EMAIL_SECURE,
	APP_EMAIL_USERNAME,
	// envalid other properties
	isDev,
	isProd,
	isTest,
} = env;
// display the environments in the console

displayEnvironments(env);
