import { LoopStructure, LoopStructureArgs } from "./LoopStructure";

type doWhileArgs = LoopStructureArgs & {

}

export class DoWhile extends LoopStructure {

    constructor({ ...args }: doWhileArgs) {
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