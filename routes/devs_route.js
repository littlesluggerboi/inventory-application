import { Router } from "express";
import devValidator from "../validators/dev_validator.js";
import validator from "../validators/validator.js";
import validIdValidator from "../validators/valid_id_validator.js";
import paramsValidator from "../validators/params_validator.js";
import controller from "../controller/devs_controller.js";

const devsRouter = Router();

devsRouter.get("/", controller.getRoot);

devsRouter.get("/new", controller.getNew);

devsRouter.post("/new", devValidator, validator, controller.postNew);

devsRouter.get(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  controller.getEdit
);

devsRouter.post(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  devValidator,
  validator,
  controller.postEdit
);

devsRouter.get("/:id", validIdValidator, paramsValidator, controller.getWithId);

devsRouter.get(
  "/:id/delete",
  validIdValidator,
  paramsValidator,
  controller.getDeleteWithId
);

export default devsRouter;
