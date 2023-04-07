import { Statement, StatementArgs } from "./Statement";
import { SubroutineCall } from "./subroutines/SubroutineCall";

export type MainArgs = StatementArgs & {
    call: SubroutineCall;
}

export class Main extends Statement {

    public call: SubroutineCall;

    constructor(args: MainArgs) {
        super(args);
        this.call = args.call;
    }

    public getGrahpvizLabel(): string {
        return `Main`;
    }
    public getGrahpvizEdges(): string {
        return `
            ${this.linkStatement(this.call)}
        `
    }
    public evaluate() {
        this.call.evaluate();
    }

}