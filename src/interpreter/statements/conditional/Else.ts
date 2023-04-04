import { Structure, StructureArgs } from '../Structure';

export type elseArgs = StructureArgs & {
}

export class Else extends Structure {

    constructor({ ...args }: elseArgs) {
        super(args);
    }

    public graphviz(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizLabel(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizEdges(): string {
        throw new Error('Method not implemented.');
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }

}