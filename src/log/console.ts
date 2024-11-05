import { pino } from 'pino';

export const cLogger = pino({ name: 'app-logs' });
