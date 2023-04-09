import { Breakable } from "../../context";
import { LoopStructure, LoopStructureArgs } from "./LoopStructure";

export type whileArgs = LoopStructureArgs & {

}

export class While extends LoopStructure implements Breakable {

    public break: boolean;
    constructor({ ...args }: whileArgs) {
        super(args);
        this.break = false;
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