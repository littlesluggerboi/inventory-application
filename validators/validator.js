import { validationResult } from "express-validator"

const validator = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render("/error_pages/404.ejs");
    }
    next();
}

export default validator;