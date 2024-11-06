import type { Request, Response } from 'express';

import openAPIDocument from '~server/openAPIDocumentGenerator';

export const ProvideJSON = (_req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(openAPIDocument);
};
