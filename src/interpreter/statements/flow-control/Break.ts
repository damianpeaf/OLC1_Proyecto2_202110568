import { Statement, StatementArgs } from '../Statement';


type BreakArgs = StatementArgs;

export class Break extends Statement {

    constructor(args: BreakArgs) {
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