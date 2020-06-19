import { CustomErr } from "./custom-err";

export class BadRequestErr extends CustomErr{
    statusCode = 400;

    serializeErrors() {
        return [{message: ''}]
    }

}
