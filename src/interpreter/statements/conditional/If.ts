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

    public getGrahpvizLabel(): string {
        return 'If';
    }
    public getGrahpvizEdges(): string {

        const n = this.getGraphvizNode()

        return `
            ${this.chain.length > 0
                ? `
                    ${n}A [label="Cadena de anidamiento"];
                    ${n} -> ${n}A;
                    ${this.linkStatementsCustom(this.chain, n + 'A')}
                `
                : ''
            }

        `
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }

}