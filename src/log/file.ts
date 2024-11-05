import { pino } from 'pino';

import { APP_LOGS_DIR } from '&server/env';

export const fLogger = pino(
	{ name: 'app-accounts-file' },
	pino.destination({
		dest: `${APP_LOGS_DIR}/logs.log`,
		append: true,
		sync: true,
	})
);
