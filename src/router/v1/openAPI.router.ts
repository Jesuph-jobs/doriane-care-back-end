import { Router } from "express";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import swaggerUi from "swagger-ui-express";

import { ProvideJSON } from "@server/handlers/openAPIRouter.handler";
import openAPIDocument from "~server/openAPIDocumentGenerator";

const router = Router();
const theme = new SwaggerTheme();
router.get("/v1/swagger.json", ProvideJSON);

router.use(
	"/v1",
	swaggerUi.serve,
	swaggerUi.setup(openAPIDocument, {
		explorer: true,
		customCss: theme.getBuffer(SwaggerThemeNameEnum.OUTLINE),
	}),
);

export default router;
