import { validationResult } from "express-validator";
const paramsValidator = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).send("404 | Not Found");
  }
  next();
};

export default paramsValidator;
