import { LoopStructure, LoopStructureArgs } from "./LoopStructure";

export type whileArgs = LoopStructureArgs & {

}

export class While extends LoopStructure {

    constructor({ ...args }: whileArgs) {
        super(args);
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