import { Statement, StatementArgs } from "../";
import { Expression } from "../expression";
import { Variable } from '../../elements/Variable';
import { Primitive, Vector } from "../../elements";


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

        let variableType = ''

        if (this.variable instanceof Primitive) {
            variableType = this.variable.type
        } else if (this.variable instanceof Vector) {
            variableType = this.variable.type
        }


        return `
            ${n}T [label="Tipo: ${this.variable.type}"]
            ${n} -> ${n}T

            ${n}I [label="Identificador: ${this.variable.name}"]
            ${n} -> ${n}I

            ${n}IGUAL [label="="]
            ${n} -> ${n}IGUAL

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