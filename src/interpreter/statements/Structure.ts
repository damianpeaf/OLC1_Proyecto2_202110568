import { Statement, StatementArgs } from "./Statement";

export type StructureArgs = StatementArgs & {
    statements: Statement[];
};

export abstract class Structure extends Statement {

    public statements: Statement[];

    constructor({ statements, ...args }: StructureArgs) {
        super(args);
        this.statements = statements;
    }

    public graphviz(): string {

        const n = this.getGraphvizNode()
        return `
            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}

            ${n}LBRACE [label="{"]
            ${n} -> ${n}LBRACE
            
            ${n}I [label="Instrucciones"]
            ${n} -> ${n}I;

            ${n}RBRACE [label="}"]
            ${n} -> ${n}RBRACE

            ${this.linkStatementsCustom(this.statements, n + 'I')}
        `
    }

}