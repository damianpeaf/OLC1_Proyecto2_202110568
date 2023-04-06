import { PrimitiveT } from '../../elements';
import { Statement, StatementArgs } from '../Statement';


export type ArgumentArgs = StatementArgs & {
    name: string;
    type: PrimitiveT;
};

export class Argument extends Statement {

    public name: string;
    public type: PrimitiveT;

    constructor({ name, type, ...args }: ArgumentArgs) {
        super(args);

        this.name = name;
        this.type = type;
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