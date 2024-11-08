import { pino } from 'pino';

import { FY_LOGS_DIR } from '&server/env';

export const fLogger = pino(
	{ name: 'app-accounts-file' },
	pino.destination({
		dest: `${FY_LOGS_DIR}/logs.log`,
		append: true,
		sync: true,
	})
);
