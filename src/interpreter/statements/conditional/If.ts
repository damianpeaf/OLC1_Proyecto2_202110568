import { Structure } from '../Structure';
import { ConditionalStructure, ConditionalStructureArgs, ElseIf, Else } from './';

export type ifArgs = ConditionalStructureArgs & {
    chain: Structure[];
}

type chainT = ElseIf | Else;

export class If extends ConditionalStructure {

    private chain: chainT[];

    constructor({ chain, ...args }: ifArgs) {
        super(args);
        this.chain = chain;
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