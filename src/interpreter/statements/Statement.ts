import { Context } from "../context";

export type StatementArgs = {
    column: number;
    line: number;
    id: number;
}

export abstract class Statement {

    public id: number;
    public column: number;
    public line: number;
    public context: any;

    constructor({ column = -1, line = -1, id = -1 }: StatementArgs) {
        this.column = column;
        this.line = line;
        this.id = id;
    }

    public abstract graphviz(): string;

    public abstract getGrahpvizLabel(): string;

    public abstract getGrahpvizEdges(): string;

    public abstract evaluate(): any;

    public getGrahpvizNodeDefinition() {
        return this.getGraphvizNode() + '[label="' + this.getGrahpvizLabel() + '"];\n';
    }

    public getGraphvizNode() {
        return "N" + this.id;
    }

    public setContext(context: Context) {
        this.context = context;
    }


    public getContext() {
        return this.context;
    }

    public getColumn() {
        return this.column;
    }

    public getLine() {
        return this.line;
    }

    public getId() {
        return this.id;
    }
}