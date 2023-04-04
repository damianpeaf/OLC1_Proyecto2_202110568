import { LoopStructure, LoopStructureArgs } from "./LoopStructure";
import { VariableDeclaration, VariableAssigment } from '../variable';

type forArgs = LoopStructureArgs & {
    init: VariableDeclaration | VariableAssigment;
    increment: VariableAssigment;
}

export class For extends LoopStructure {

    private init: VariableDeclaration | VariableAssigment
    private increment: VariableAssigment

    constructor({ init, increment, ...args }: forArgs) {
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