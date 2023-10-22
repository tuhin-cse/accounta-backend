import {validationResult} from "express-validator";

const validate = (validations) => async (req , res, next) => {
    for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
    }
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(422).send({
        error: true,
        msg: errors.array()[0].msg,
    })
}

export default validate