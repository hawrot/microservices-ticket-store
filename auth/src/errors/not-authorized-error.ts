import {CustomErr} from "./custom-err";

export class NotAuthorizedError extends CustomErr {
    statusCode = 401;
    reason = 'You are not authorized';

    constructor() {
        super('You are not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(){
        return [
            { message: this.reason }
        ]
    }

}
