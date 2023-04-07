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

    public evaluate() {
        const isDeclared = this.context.scopeTrace.variableExists(this.variable.name)

        if (isDeclared) {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `La variable ${this.variable.name} ya ha sido declarada`,
                type: 'Semantico'
            })
            return;
        }

        if (this.value) {
            this.value.evaluate()
            if (this.value.validateType(this.variable.type)) {
                this.variable.value = this.value.value
            }
        }

        this.context.scopeTrace.addVariable(this.variable);
    }

    public getGrahpvizLabel(): string {
        return 'Declaracion de variable'
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode()

        // ? type

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
}