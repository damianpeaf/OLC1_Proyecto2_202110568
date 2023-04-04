import { Statement } from "../statements";
import { Node, NodeArgs } from "./";

export type RootArgs = NodeArgs & {
    stmts: Statement[]
};

export class Root extends Node {

    public stmts: Statement[];

    public constructor({ stmts, ...args }: RootArgs) {
        super(args);
        this.stmts = stmts;
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