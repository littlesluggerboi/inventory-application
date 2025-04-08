import { param } from "express-validator";

const validIdValidator = [
    param("id").isInt().custom((val)=> parseInt(val) > 0)
]

export default validIdValidator;