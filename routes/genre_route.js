import { Router } from "express";
import genreValidator from "../validators/genre_validator.js";
import validator from "../validators/validator.js";
import controller from "../controller/genre_controller.js";
const genreRouter = Router();

genreRouter.get("/", controller.getRoot);

genreRouter.get("/new", controller.getNew);

genreRouter.post("/new", genreValidator, validator, controller.postNew);

genreRouter.get("/:id/edit", controller.getEdit);

genreRouter.get("/:id/delete", controller.getDeleteWithId);

genreRouter.post("/:id/edit", genreValidator, validator, controller.postEdit);

genreRouter.get("/:id", controller.getWithId);

export default genreRouter;
