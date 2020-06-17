import {CustomErr} from "./custom-err";

export class DatabaseConnectionError extends CustomErr {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [
            { message: this.reason }
        ]
    }

}
