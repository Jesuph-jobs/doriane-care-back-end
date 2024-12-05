import fs from 'node:fs';
import { pino } from 'pino';

import { FY_LOGS_DIR } from '&server/env';

if (!fs.existsSync(FY_LOGS_DIR)) {
	fs.mkdirSync(FY_LOGS_DIR);
}

export const fLogger = pino(
	{ name: 'app-accounts-file' },
	pino.destination({
		dest: `${FY_LOGS_DIR}/logs.log`,
		append: true,
		sync: true,
	})
);
