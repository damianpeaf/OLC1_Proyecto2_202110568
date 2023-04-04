import { Statement, StatementArgs } from "../Statement";
import { Expression } from "../expression";
import { Case, Default } from "./";


export type SwitchArgs = StatementArgs & {
    value: Expression;
    cases: Case[];
    defaultCase: Default;
}

export class Switch extends Statement {

    private value: Expression;
    private cases: Case[];
    private defaultCase: Default;

    constructor({ value, cases, defaultCase, ...args }: SwitchArgs) {
        super(args);
        this.value = value;
        this.cases = cases;
        this.defaultCase = defaultCase;
    }

    public graphviz(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizLabel(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizEdges(): string {
        throw new Error("Method not implemented.");
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }

}