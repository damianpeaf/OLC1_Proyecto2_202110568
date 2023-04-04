import { Statement, StatementArgs } from '../Statement';


export type ContinueArgs = StatementArgs;

export class Continue extends Statement {

    constructor(args: ContinueArgs) {
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