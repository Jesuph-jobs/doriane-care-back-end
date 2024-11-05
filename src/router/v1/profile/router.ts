import { Router } from "express";

import {
	getContactInformation,
	updateContactInformation,
	updateMainContact,
	updatePassword,
	updatePersonalInformation,
	updatePicture,
} from "@server/handlers/profile";
import { checkLogs, isLoggedIn } from "@server/middleware/auth";
// TODO: add request validation
const profileRouter = Router();
profileRouter.use(checkLogs, isLoggedIn);

profileRouter.route("/main-contact/email").put(updateMainContact("email"));
profileRouter.route("/main-contact/phone").put(updateMainContact("phone"));

profileRouter.route("/personal-information").put(updatePersonalInformation);

profileRouter.route("/contact-information").get(getContactInformation).put(updateContactInformation);
profileRouter.route("/password").put(updatePassword);
profileRouter.route("/picture").put(updatePicture);

export default profileRouter;
