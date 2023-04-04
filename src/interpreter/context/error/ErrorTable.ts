import { Error, ErrorArgs } from "./";


export class ErrorTable {

    public errors: Error[];

    constructor() {
        this.errors = [];
    }

    public addError(args: ErrorArgs) {
        this.errors.push(new Error(args));
    }

}