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

    public linkStatement(statement: Statement) {
        return `
            ${statement.graphviz()}
            ${this.getGraphvizNode()} -> ${statement.getGraphvizNode()};
        `
    }

    public linkStatements(statements: Statement[]) {
        return `
            ${statements.map(stmt => this.linkStatement(stmt)).join('\n')}
        `
    }

    public linkStatementCustom(statement: Statement, node: string) {
        return `
            ${statement.graphviz()}
            ${node} -> ${statement.getGraphvizNode()};
        `
    }

    public linkStatementsCustom(statements: Statement[], node: string) {
        return `
            ${statements.map(stmt => this.linkStatementCustom(stmt, node)).join('\n')}
        `
    }
}