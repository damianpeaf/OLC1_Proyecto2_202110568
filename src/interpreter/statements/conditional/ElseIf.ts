import { ConditionalStructure, ConditionalStructureArgs } from './ConditionalStructure';

type elseIfArgs = ConditionalStructureArgs & {
}

export class ElseIf extends ConditionalStructure {

    constructor({ ...args }: elseIfArgs) {
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