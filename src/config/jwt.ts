import { FY_JWT_PayloadSchema } from '^server/models/back/jwt';

import { JWT } from '@server/utils/JWT';

import { FY_JWT_SECRET } from './env';

export const Jwt = new JWT<JWT_Payload>(FY_JWT_SECRET, FY_JWT_PayloadSchema());
