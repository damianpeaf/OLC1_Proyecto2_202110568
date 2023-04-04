import { LoopStructure, LoopStructureArgs } from "./LoopStructure";
import { VariableDeclaration, VariableAssigment } from '../variable';

export type ForArgs = LoopStructureArgs & {
    init: VariableDeclaration | VariableAssigment;
    increment: VariableAssigment;
}

export class For extends LoopStructure {

    private init: VariableDeclaration | VariableAssigment
    private increment: VariableAssigment

    constructor({ init, increment, ...args }: ForArgs) {
        super(args);

        this.init = init;
        this.increment = increment;
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