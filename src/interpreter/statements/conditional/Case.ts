import { ConditionalStructure, ConditionalStructureArgs } from "./";

export type CaseArgs = ConditionalStructureArgs

export class Case extends ConditionalStructure {

    // ? Add a reference to the switch statement that this case belongs to

    constructor({ ...args }: CaseArgs) {
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