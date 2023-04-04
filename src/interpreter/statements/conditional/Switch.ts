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