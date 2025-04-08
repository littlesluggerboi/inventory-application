import { Router } from "express";
import controller from "../controller/index_controller.js";

const indexRouter = Router();

indexRouter.get("/", controller.getRoot);

indexRouter.get("/home", controller.getHome);

export default indexRouter;
