import { Statement, StatementArgs } from "../Statement";
import { Expression } from "../expression";
import { Case, Default } from "./";

type CasesType = Case | Default;

export type SwitchArgs = StatementArgs & {
    value: Expression;
    cases: CasesType[];
}

export class Switch extends Statement {

    private value: Expression;
    private cases: CasesType[];

    constructor({ value, cases, ...args }: SwitchArgs) {
        super(args);
        this.value = value;
        this.cases = cases;
    }

    public getGrahpvizLabel(): string {
        return "Switch";
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode();
        return `
            ${n}LPAREN [label="("]
            ${n} -> ${n}LPAREN

            ${this.linkStatement(this.value)}

            ${n}RPAREN [label=")"]
            ${n} -> ${n}RPAREN
        
            ${n}LBRACE [label="{"]
            ${n} -> ${n}LBRACE

            ${n}CASES [label="Casos"]
            ${n} -> ${n}CASES

            ${n}RBRACE [label="}"]
            ${n} -> ${n}RBRACE

            ${this.linkStatementsCustom(this.cases, n + 'CASES')}
        `
    }
    public evaluate() {
        this.value.evaluate();
        const referenceValue = {
            type: this.value.returnType,
            value: this.value.value
        }

        for (const c of this.cases) {

            if (c instanceof Case) {
                c.referenceValue = referenceValue;
                c.evaluate();
                if (c.break) break;
                // Evaluate next case
                continue;
            }

            if (c instanceof Default) {
                c.evaluate();
                break;
            }

        }
    }

}