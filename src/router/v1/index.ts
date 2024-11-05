import { Router } from "express";

import authRouter from "./auth/router";
import filesRouter from "./files/router";
import healthCheckRouter from "./healthCheck/router";
import profileRouter from "./profile/router";

const v1Router = Router();
// Routes
v1Router.use("/health-check", healthCheckRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/files", filesRouter);
export default v1Router;
