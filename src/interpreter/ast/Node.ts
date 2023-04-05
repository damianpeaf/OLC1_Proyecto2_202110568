import { Context } from "../context";


export type NodeArgs = {
    id: number;
    context: Context;
}

export abstract class Node {

    public id: number;
    public context: Context;

    constructor({ id, context }: NodeArgs) {
        this.id = id;
        this.context = context;
    }

    public graphviz(): string {
        return `
            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}
        `
    }

    public abstract getGrahpvizLabel(): string;

    public abstract getGrahpvizEdges(): string;

    public abstract evaluate(): any;

    public getGrahpvizNodeDefinition() {
        return this.getGraphvizNode() + '[label="' + this.getGrahpvizLabel() + '"];\n';
    }

    public getGraphvizNode() {
        return "N" + this.id;
    }

    public getId() {
        return this.id;
    }

}