import { Statement, StatementArgs } from "../";
import { Expression } from "../expression";
import { Variable } from '../../elements/Variable';


export type VariableDeclarationArgs = StatementArgs & {
    variable: Variable,
    value?: Expression | null;
}

export class VariableDeclaration extends Statement {

    public variable: Variable
    public value: Expression | null;

    constructor({ variable, value = null, ...stmtArgs }: VariableDeclarationArgs) {
        super(stmtArgs);
        this.variable = variable
        this.value = value;
    }

    public getGrahpvizLabel(): string {
        return 'Declaracion de variable'
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode()

        return `

            ${this.value
                ? this.linkStatement(this.value)
                : ''
            }
        `
    }
    public evaluate() {

        // context

        throw new Error("Method not implemented.");
    }
}