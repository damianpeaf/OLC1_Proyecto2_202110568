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

    public getGrahpvizLabel(): string {
        return `Llamada a subrutina: ${this.name}`;
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode();
        return `
            ${n}Args [label="Argumentos"]
            ${n} -> ${n}Args
            ${this.linkStatementsCustom(this.args, n + 'Args')}
        `
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }

}