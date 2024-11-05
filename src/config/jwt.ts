import { APP_JWT_PayloadSchema, APP_OAUTH_JWT_PayloadSchema } from "^server/models/back/jwt";

import { JWT } from "@server/utils/JWT";

import { APP_JWT_SECRET, APP_JWT_SECRET_OAUTH } from "./env";

export const Jwt = new JWT<APP_JWT_Payload>(APP_JWT_SECRET, APP_JWT_PayloadSchema());
export const JwtOAuth = new JWT<APP_OAUTH_JWT_Payload>(APP_JWT_SECRET_OAUTH, APP_OAUTH_JWT_PayloadSchema());
