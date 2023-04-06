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
        throw new Error("Method not implemented.");
    }
    public getGrahpvizEdges(): string {
        throw new Error("Method not implemented.");
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }

}