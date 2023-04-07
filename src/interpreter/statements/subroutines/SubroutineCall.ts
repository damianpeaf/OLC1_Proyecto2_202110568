import { PrimitiveT } from '../../elements';
import { Statement, StatementArgs } from '../Statement';
import { Expression } from '../expression';


export type SubroutineCallArgs = StatementArgs & {
    name: string;
    args: Expression[];
    objectName?: string | null;
};

export class SubroutineCall extends Statement {

    public name: string;
    public args: Expression[];

    constructor({ name, args, objectName = null, ...stmtArgs }: SubroutineCallArgs) {
        super(stmtArgs);

        this.name = name;
        this.args = args;
    }

    public evaluate() {
        const subroutine = this.context.scopeTrace.getSubroutine(this.name);
        if (subroutine) {
            return subroutine.call(this.args, this);
        } else {
            this.context.errorTable.addError({
                message: `La subrutina ${this.name} no existe`,
                column: this.column,
                line: this.line,
                type: 'Semantico'
            })
        }
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

}