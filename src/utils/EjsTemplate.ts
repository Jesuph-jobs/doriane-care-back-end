import ejs from 'ejs';

import { cLogger } from '$server/console';

import { readTextFile } from './File';

export default class EjsTemplate<T extends EmailTemplates = EmailTemplates> {
	public name: EmailTemplates;
	public templates: Record<LanguagesI, Promise<string>>;
	public additionalContext: AdditionalContext;
	public templatesPromise: Promise<string[]>;

	constructor(name: T, additionalContext: AdditionalContext) {
		this.name = name;
		this.additionalContext = additionalContext;
		this.templates = {
			ar: this.loadTemplate('ar'),
			en: this.loadTemplate('en'),
			fr: this.loadTemplate('fr'),
		};
		const templatePromises = Object.values(this.templates);
		this.templatesPromise = Promise.all(templatePromises);
		templatePromises.forEach(template =>
			template
				.then(() => cLogger.info(`📝 Template '${name}' is ready`))
				.catch(error => {
					cLogger.error(`📝 Error in Template ${name} ${error}`);
					throw error;
				})
		);
	}
	public async loadTemplate(language: LanguagesI) {
		return readTextFile(`common/templates/${this.name}/${language.toUpperCase()}.ejs`);
	}
	public async render(context: EmailContexts[T]) {
		const language: LanguagesI = context.language || 'fr';
		return this.templates[language].then(template => {
			return ejs.render(template, { ...this.additionalContext, ...context });
		});
	}
}
