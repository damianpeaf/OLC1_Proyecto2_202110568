import { Node, NodeArgs } from "../ast";

export type StatementArgs = NodeArgs & {
    column: number;
    line: number;
}

export abstract class Statement extends Node {

    public column: number;
    public line: number;

    constructor({ column = -1, line = -1, ...args }: StatementArgs) {
        super(args);
        this.column = column;
        this.line = line;
    }

    public getColumn() {
        return this.column;
    }

    public getLine() {
        return this.line;
    }

}