import {ValidationError} from "express-validator";
import {CustomErr} from "./custom-err";

export class RequestValidationError extends CustomErr {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();

        //Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {message: err.msg, field: err.param};
        })
    }
}

