/* import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { UploadFileShapeSchema } from '^common/backend/requests/uploadFileShapeSchema';
import { errorSchema } from '^common/elements';

import { createApiRequest } from '@server/api-docs/openAPIRequestBuilders';
import { createApiResponses } from '@server/api-docs/openAPIResponseBuilders';

const filesRegistry = new OpenAPIRegistry();

filesRegistry.registerPath({
	method: 'post',
	path: '/api/v1/files',
	description: 'Vérifier si le fichier a bien été uploadé',
	summary: 'Vérifier si le fichier a bien été uploadé',
	tags: ['Files'],
	request: createApiRequest({
		body: {
			schema: UploadFileShapeSchema,
			description: 'Le fichier à uploader',
			examples: {
				'Valid example': {
					summary: "Upload d'un fichier image valide",
					value: {
						file: '<binary data>',
					},
					description: "Données binaires d'un fichier image valide",
				},
				'Invalid example': {
					summary: "Upload d'un fichier vide",
					value: {
						file: '',
					},
					description: 'Données vides pour le fichier',
				},
			},
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: z.string({ description: 'Le fichier a été uploadé' }),
			description: 'Le fichier a été uploadé',
		},
		{
			statusCode: StatusCodes.UNAUTHORIZED,
			schema: errorSchema({ message: { description: "Vous n'êtes pas connecté(e)" } }),
			description: "Vous n'êtes pas connecté(e)",
		},
		{
			statusCode: StatusCodes.NOT_FOUND,
			schema: errorSchema({ message: { description: 'Utilisateur introuvable' } }),
			description: 'Utilisateur introuvable',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({ message: { description: 'Clé publique invalide' } }),
			description: 'Clé publique invalide',
		},
		{
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			schema: errorSchema({ message: { description: "Le fichier n'a pas pu être uploadé" } }),
			description: "Le fichier n'a pas pu être uploadé",
		},
		hasPermissionResponse('file:upload'),
	]),
});

export default filesRegistry;
 */
