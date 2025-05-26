import type * as http from 'node:http';

//import { generateRandomUser } from 'tests/tools/generateRandomUser';
//import userModel from '#server/user';
import { FY_HOST, NODE_ENV, PORT, isDev, isTest } from '&server/env';

import app from './app';
import services /* , { discordWebhookService } */ from './services';

let manager: Promise<any[]> | null = null;
let serverListener: http.Server | null = null;
function BoxConsole(messages: string[]) {
	const max = messages.reduce((max, message) => Math.max(max, message.length), 0);
	const border = `+${'-'.repeat(max + 2)}+`;
	console.log(border);
	messages.forEach(message => console.log(`| ${message.padEnd(max)} |`));
	console.log(border);
}
async function start() {
	if (manager == null) manager = Promise.all(services.map(service => service.Connection));
	await manager.then(listen);
	//await userModel.createUser(generateRandomUser());
	/* const c = await emailService.sendEmail({
		to: 'tahher@live.fr',
		from: FY_EMAIL_USERNAME,
		subject: 'test',
		html: '<h1>Test</h1>',
	});
	console.log({ c }); */
}
async function listen() {
	serverListener = app.listen(PORT, () => {
		/* istanbul ignore next */
		if (!isTest)
			BoxConsole([
				`🌐 Server (${NODE_ENV}) running`,
				`⌛ Server started at ${new Date().toLocaleString('en-UK')}`,
				`⌛ Server was up in ${process.uptime()} seconds`,
				`🚪 PORT: ${PORT}`,
				...(isDev ? [`🖥️  HOST: http://${FY_HOST}:${PORT}/docs/v1`] : []),
			]);
	});

	/* istanbul ignore next */
	//if (!(isDev || isTest)) await discordWebhookService.sendToDiscord('Server started');
}
async function close() {
	serverListener?.close();
	await Promise.all([
		...services.map(service => service.stop()),
		//isDev || isTest ? null : /* istanbul ignore next */ discordWebhookService.sendToDiscord('Server closed'),
	]);
}

export { app, close, start };
