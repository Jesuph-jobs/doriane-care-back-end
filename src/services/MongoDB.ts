import mongoose, { type Mongoose } from "mongoose";

import { cLogger } from "$server/console";

// import { fLogger } from '$server/file';
import {
	APP_MONGODB_DB_DATABASE,
	APP_MONGODB_DB_PASSWORD,
	APP_MONGODB_DB_URI_WITHOUT_CREDENTIALS,
	APP_MONGODB_DB_USERNAME,
	isDev,
} from "&server/env";

import Service from "./Service";

/* istanbul ignore next */
if (isDev) mongoose.set("debug", true);

/* service details */
const id = "MongoDBService";

export default class MongoDBService extends Service<Mongoose> {
	name = "MongoDB";
	category = "Database";
	description = "MongoDB Service";

	constructor() {
		super(id, MongoDBService.connect());
		MongoDBService.setupEventHandlers();
	}

	public static async connect(): Promise<Mongoose> {
		return mongoose.connection.readyState === 0
			? mongoose.connect(APP_MONGODB_DB_URI_WITHOUT_CREDENTIALS, {
					auth: { username: APP_MONGODB_DB_USERNAME, password: APP_MONGODB_DB_PASSWORD },
					dbName: APP_MONGODB_DB_DATABASE,
				})
			: Promise.resolve(mongoose);
	}

	public async stop(): Promise<void> {
		return this.connection.then((conn) => conn.connection.close());
	}

	public static setupEventHandlers() {
		mongoose.connection.on("error", MongoDBService.errorHandler);
		mongoose.connection.on("disconnected", MongoDBService.disconnectHandler);
		mongoose.connection.on("reconnected", MongoDBService.reconnectHandler);
		mongoose.connection.on("connected", MongoDBService.connectedHandler);
		mongoose.connection.on("connecting", MongoDBService.connectingHandler);
		mongoose.connection.on("close", MongoDBService.closeHandler);
		mongoose.connection.on("open", MongoDBService.openHandler);
		mongoose.connection.on("disconnecting", MongoDBService.disconnectingHandler);
	}

	/* ----------------------------- Events handlers ----------------------------- */
	public static errorHandler(error: any) {
		cLogger.error(`🗄️ MongoDB error. ${error}`);
		//fLogger.error(`🗄️ MongoDB error. ${error}`);
	}
	public static disconnectHandler() {
		cLogger.error("🗄️ MongoDB disconnected.");
		//fLogger.error(`🗄️ MongoDB disconnected.`);
		// remove error listener
	}
	public static reconnectHandler() {
		cLogger.info("🗄️  MongoDB reconnected.");
		//fLogger.info(`🗄️ MongoDB reconnected.`);
	}
	public static connectedHandler() {
		cLogger.info(`🗄️  MongoDB is ready ==> '${APP_MONGODB_DB_DATABASE}' DB is Connected.`);
	}
	public static connectingHandler() {
		cLogger.info("🗄️  MongoDB connecting...");
		// fLogger.info(`🗄️ MongoDB connecting...`);
	}
	public static closeHandler() {
		cLogger.info("🗄️  MongoDB close.");
		// fLogger.info(`🗄️ MongoDB close.`);
	}
	public static openHandler() {
		cLogger.info("🗄️  MongoDB open.");
		//fLogger.info(`🗄️ MongoDB open.`);
	}
	public static disconnectingHandler() {
		cLogger.info("🗄️  MongoDB disconnecting...");
		//fLogger.info(`🗄️ MongoDB disconnecting...`);
	}
}
