import { body } from "express-validator";

const devValidator = [
  body("name")
    .trim()
    .isString()
    .isLength({ min: 1, max: 255 })
    .customSanitizer((value) => value.trim()),
  body("email")
    .trim()
    .isEmail()
    .isLength({ min: 1, max: 255 })
    .customSanitizer((value) => value.trim()),
  body("address")
    .trim()
    .isString()
    .isLength({ min: 1, max: 255 })
    .customSanitizer((value) => value.trim()),
  body("phone")
    .trim()
    .isString()
    .isLength({ min: 1, max: 255 })
    .optional()
    .customSanitizer((value) => value.trim()),
  body("games")
    .custom((value) => {
      if (value == null) {
        return true;
      }
      if (typeof value == "string") {
        if (isNaN(parseInt(value))) {
          return false;
        }
        return true;
      } else if (Array.isArray(value)) {
        for (let val of value) {
          if (isNaN(parseInt(val))) {
            return false;
          }
        }
        return true;
      }
      return false;
    })
    .customSanitizer((value) => {
      if (value == null) {
        return [];
      }
      if (typeof value == "string") {
        return [parseInt(value)];
      } else {
        return value.map((val) => parseInt(val));
      }
    }),
];

export default devValidator;
