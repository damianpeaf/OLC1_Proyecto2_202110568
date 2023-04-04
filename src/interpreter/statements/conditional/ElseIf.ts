import { ConditionalStructure, ConditionalStructureArgs } from './ConditionalStructure';

export type ElseIfArgs = ConditionalStructureArgs & {
}

export class ElseIf extends ConditionalStructure {

    constructor({ ...args }: ElseIfArgs) {
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