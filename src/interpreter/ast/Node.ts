import { Context } from "../context";


export type NodeArgs = {
    id: number;
}

export abstract class Node {

    public id: number;

    constructor({ id }: NodeArgs) {
        this.id = id;
    }

    public abstract graphviz(): string;

    public abstract getGrahpvizLabel(): string;

    public abstract getGrahpvizEdges(): string;

    public abstract evaluate(): any;

    public getGrahpvizNodeDefinition() {
        return this.getGraphvizNode() + '[label="' + this.getGrahpvizLabel() + '"];\n';
    }

    public getGraphvizNode() {
        return "N" + this.id;
    }

    set context(context: Context) {
        this.context = context;
    }

    get context() {
        return this.context;
    }

    public getId() {
        return this.id;
    }

}