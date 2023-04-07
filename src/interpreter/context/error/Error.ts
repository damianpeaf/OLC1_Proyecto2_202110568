
export type ErrorType = "Lexico" | "Sintactico" | "Semantico" | "Runtime";


export type ErrorArgs = {
    type: ErrorType,
    message: string,
    line: number,
    column: number
}
export class Error {

    public type: ErrorType;
    public message: string;
    public line: number;
    public column: number;

    constructor({ type, message, line, column }: ErrorArgs) {
        this.type = type;
        this.message = message;
        this.line = line;
        this.column = column;
    }

    public getType(): ErrorType {
        return this.type;
    }

    public getMessage(): string {
        return this.message;
    }

    public getLine(): number {
        return this.line;
    }

    public getColumn(): number {
        return this.column;
    }

    public toString(): string {
        return `${this.type} en linea ${this.line} y columna ${this.column}: ${this.message}`;
    }

}