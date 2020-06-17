import {CustomErr} from "./custom-err";

export class DatabaseConnectionError extends CustomErr {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('Error connecting to DB');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [
            { message: this.reason }
        ]
    }

}
