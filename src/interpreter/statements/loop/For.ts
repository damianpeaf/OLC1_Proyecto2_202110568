import { LoopStructure, LoopStructureArgs } from "./LoopStructure";
import { VariableDeclaration, VariableAssigment } from '../variable';
import { Breakable } from "../../context";

export type ForArgs = LoopStructureArgs & {
    init: VariableDeclaration | VariableAssigment;
    update: VariableAssigment;
}

export class For extends LoopStructure implements Breakable {

    private init: VariableDeclaration | VariableAssigment
    private update: VariableAssigment
    public break: boolean;


    constructor({ init, update, ...args }: ForArgs) {
        super(args);

        this.init = init;
        this.update = update;
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