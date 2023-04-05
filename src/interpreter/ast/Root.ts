import { Statement } from "../statements";
import { Node, NodeArgs } from "./";

export type RootArgs = NodeArgs & {
    stmts: Statement[];
};

export class Root extends Node {

    public stmts: Statement[];

    public constructor({ stmts, ...args }: RootArgs) {
        super(args);
        this.stmts = stmts;
    }

    public graphviz(): string {

        const stmtsGraphs = this.stmts.map(stmt => stmt.graphviz()).join('\n');

        return `
            digraph G {

            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}
            ${stmtsGraphs}

            }
        `
    }
    public getGrahpvizLabel(): string {
        return 'Root'
    }
    public getGrahpvizEdges(): string {
        return this.stmts.map(stmt => `${this.getGraphvizNode()} -> ${stmt.getGraphvizNode()};`).join('\n');
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }

}