import { Statement, StatementArgs } from '../Statement';
import { Expression } from '../expression';


export type ReturnArgs = StatementArgs & {
    value?: Expression | null;
};

export class Return extends Statement {

    public value: Expression | null;

    constructor({ value = null, ...args }: ReturnArgs) {
        super(args);
        this.value = value;
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