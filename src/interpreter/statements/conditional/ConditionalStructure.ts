import { Structure, StructureArgs } from "../Structure";
import { Expression } from "../expression";


export type ConditionalStructureArgs = StructureArgs & {
    condition: Expression
}

export abstract class ConditionalStructure extends Structure {

    public condition: Expression;

    constructor({ condition, ...args }: ConditionalStructureArgs) {
        super(args);
        this.condition = condition;
    }

    public graphviz(): string {

        const n = this.getGraphvizNode()
        return `
            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}

            ${n}LPAREN [label="("];
            ${n} -> ${n}LPAREN;

            ${n}C [label="Condicion"];
            ${n} -> ${n}C;
            ${this.linkStatementCustom(this.condition, n + 'C')}
            
            ${n}RPAREN [label=")"];
            ${n} -> ${n}RPAREN;

            ${n}LBRACE [label="{"];
            ${n} -> ${n}LBRACE;
            
            ${n}I [label="Instrucciones"];
            ${n} -> ${n}I;

            ${n}RBRACE [label="}"];
            ${n} -> ${n}RBRACE;

            ${this.linkStatementsCustom(this.statements, n + 'I')}
            
        `
    }
}