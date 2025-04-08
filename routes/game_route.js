import { Router } from "express";
import gameValidator from "../validators/game_validator.js";
import validator from "../validators/validator.js";
import validIdValidator from "../validators/valid_id_validator.js";
import paramsValidator from "../validators/params_validator.js";
import controller from "../controller/game_controller.js";

const gameRouter = Router();

gameRouter.get("/", controller.getRoot);

gameRouter.get("/new", controller.getNew);

gameRouter.post("/new", gameValidator, validator, controller.postNew);

gameRouter.get(
  "/:id/delete",
  validIdValidator,
  paramsValidator,
  controller.getDeleteWithId
);

gameRouter.get(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  controller.getEdit
);

gameRouter.post(
  "/:id/edit",
  validIdValidator,
  paramsValidator,
  gameValidator,
  validator,
  controller.postEdit
);

gameRouter.get("/:id", validIdValidator, paramsValidator, controller.getWithId);

export default gameRouter;
