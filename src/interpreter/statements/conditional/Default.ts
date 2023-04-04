import { Structure, StructureArgs } from "../Structure";

export type DefaultArgs = StructureArgs & {
}

export class Default extends Structure {

    constructor({ ...args }: DefaultArgs) {
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