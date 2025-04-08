import { body } from "express-validator";

const gameValidator = [
  body("name")
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .customSanitizer((value) => value.trim()),
  body("description")
    .isString()
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => value.trim()),
  body("release_date").isDate(),
  body("price")
    .isDecimal()
    .custom((value) => value > 0)
    .customSanitizer((value) => parseFloat(value)),
  body("genres")
    .custom((value) => {
      if (value == null) {
        return true;
      } else if (typeof value == "string") {
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
      } else if (typeof value == "string") {
        return [parseInt(value)];
      } else {
        return value.map((val) => parseInt(val));
      }
    }),
  body("developers")
    .custom((value) => {
      if (value == null) {
        return true;
      } else if (typeof value == "string") {
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
      } else if (typeof value == "string") {
        return [parseInt(value)];
      } else {
        return value.map((val) => parseInt(val));
      }
    }),
];

export default gameValidator;
