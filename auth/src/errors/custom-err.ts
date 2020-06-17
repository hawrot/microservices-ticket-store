export abstract class CustomErr extends Error {
    abstract statusCode: number;

    constructor() {
        super();

        Object.setPrototypeOf(this, CustomErr.prototype);
    }

    abstract serializeErrors(): {message: string; field?: string}[]
}
