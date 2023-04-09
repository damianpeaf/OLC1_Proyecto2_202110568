import { Breakable, Continueable } from "../../context";
import { LoopStructure, LoopStructureArgs } from "./LoopStructure";

export type DoWhileArgs = LoopStructureArgs & {

}

export class DoWhile extends LoopStructure implements Breakable, Continueable {

    public break: boolean;
    public continue: boolean;

    constructor({ ...args }: DoWhileArgs) {
        super(args);
        this.break = false;
        this.continue = false;
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