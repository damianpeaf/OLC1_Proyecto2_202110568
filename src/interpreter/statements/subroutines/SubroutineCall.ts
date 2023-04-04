import { VariableType } from '../../elements';
import { Statement, StatementArgs } from '../Statement';
import { Expression } from '../expression';


export type SubroutineCallArgs = StatementArgs & {
    name: string;
    args: Expression[];
};

export class SubroutineCall extends Statement {

    private name: string;
    private args: Expression[];

    constructor({ name, args, ...stmtArgs }: SubroutineCallArgs) {
        super(stmtArgs);

        this.name = name;
        this.args = args;
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