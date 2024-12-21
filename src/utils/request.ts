import { languages } from '@common/i18n/languages';
import type { Request } from 'express';

export function getRequestLanguage(req: Request): LanguagesI {
	const l = req.headers['accept-language'];
	return l && languages.includes(l as LanguagesI) ? (l as LanguagesI) : 'en';
}
