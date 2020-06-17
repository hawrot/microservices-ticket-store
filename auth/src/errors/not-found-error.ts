import {CustomErr} from "./custom-err";

export class NotFoundError extends CustomErr {
    statusCode = 404;

    constructor() {
        super('Route not dound');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{message: 'Not Found'}];
    }
}
