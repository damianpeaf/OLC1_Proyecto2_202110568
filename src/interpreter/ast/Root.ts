import { Statement } from "../statements";
import { Node, NodeArgs } from "./";

export type RootArgs = NodeArgs & {
};

export class Root extends Node {

    public stmts: Statement[];

    public constructor({ ...args }: RootArgs) {
        super(args);
        this.stmts = [];
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