import type * as http from 'node:http';
import BoxConsole from 'box-console';

//import { generateRandomUser } from 'tests/tools/generateRandomUser';
//import userModel from '#server/user';
import { APP_HOST, NODE_ENV, PORT, isDev, isTest } from '&server/env';

import app from './app';
import services, { discordWebhookService } from './services';

let manager: Promise<any[]> | null = null;
let serverListener: http.Server | null = null;

async function start() {
	if (manager == null) manager = Promise.all(services.map(service => service.Connection));
	await manager.then(listen);
	//await userModel.createUser(generateRandomUser());
}
async function listen() {
	serverListener = app.listen(PORT, () => {
		/* istanbul ignore next */
		if (!isTest)
			BoxConsole([
				`🌐 Server (${NODE_ENV}) running`,
				`⌛ Server was up in ${process.uptime()} seconds`,
				`🚪 PORT: ${PORT}`,
				isDev ? `🖥️  HOST: http://${APP_HOST}:${PORT}/docs/v1` : '',
			]);
	});

	/* istanbul ignore next */
	if (!(isDev || isTest)) await discordWebhookService.sendToDiscord('Server started');
}
async function close() {
	serverListener!.close();
	await Promise.all([
		...services.map(service => service.stop()),
		isDev || isTest ? null : /* istanbul ignore next */ discordWebhookService.sendToDiscord('Server closed'),
	]);
}

export { app, close, start };
