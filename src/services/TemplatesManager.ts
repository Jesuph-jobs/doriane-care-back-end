import { cLogger } from '$server/console';

import { FY_BACK_DOMAIN, FY_NOREPLY_EMAIL } from '&server/env';
import Service from '@common/services/Service';
// import { fLogger } from '$server/file';
import EjsTemplate from '@server/utils/EjsTemplate';

/* service details */
const id = 'TemplatesManager';
const defaultContext: AdditionalContext = {
	logo: new URL('/public/logo.svg', FY_BACK_DOMAIN).href,
	supportEmail: FY_NOREPLY_EMAIL,
	AppName: 'AppName',
};
export const resetPassword = new EjsTemplate('resetPassword', defaultContext);
export const resetedPassword = new EjsTemplate('resetedPassword', defaultContext);
export const validateEmail = new EjsTemplate('validateEmail', defaultContext);
export const welcomeAdmin = new EjsTemplate('welcomeAdmin', defaultContext);
const templates: Record<EmailTemplates, EjsTemplate<EmailTemplates>> = {
	resetPassword,
	validateEmail,
	resetedPassword,
	welcomeAdmin,
};

class TemplatesManager extends Service<void> {
	name = 'Templates Manager';
	category = 'Templates';
	description = 'Templates Manager Service';
	constructor() {
		super(id, TemplatesManager.connect());
	}
	public static async connect() {
		return Promise.all(Object.values(templates).map(template => template.templatesPromise))
			.then(() => {
				cLogger.info('📝 Templates Manager is ready');
			})
			.catch(error => {
				cLogger.error(`📝 Error in Templates Manager ${error}`);
				//fLogger.error(`📝 Error in Templates Manager ${error}`);
				throw error;
			});
	}
	public async render<T extends EmailTemplates>(name: T, context: EmailContexts[T]) {
		return templates[name].render(context).catch(error => {
			cLogger.error(`📝 Error in Template rendering ${name} ${error}`);
			//fLogger.error(`📝 Error in Template rendering ${name} ${error}`);
			throw error;
		});
	}
	public stop(): Promise<void> {
		return Promise.resolve();
	}
}
export default TemplatesManager;
