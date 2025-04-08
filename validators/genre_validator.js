import { body } from "express-validator";

const genreValidator = [
  body("name")
    .trim()
    .isString()
    .isLength({ min: 1, max: 255 })
    .customSanitizer((value) => value.trim()),
];

export default genreValidator;
