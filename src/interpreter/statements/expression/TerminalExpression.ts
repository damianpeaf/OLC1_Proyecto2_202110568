import { Value } from "../value";
import { VariableAssigment } from "../variable";
import { Expression, ExpressionArgs, ExpressionReturnType } from "./Expression";


export type ReferenceType =
    "VARIABLE" |
    "INCREMENT" |
    "DECREMENT" |
    "INT_LITERAL" |
    "DOUBLE_LITERAL" |
    "STRING_LITERAL" |
    "BOOLEAN_LITERAL" |
    "TRUE" |
    "FALSE" |
    "SUBROUTINE_CALL";

export type TerminalExpressionArgs = ExpressionArgs & {
    value: Value
}

export class TerminalExpression extends Expression {

    private _value: Value;

    constructor({ value, ...args }: TerminalExpressionArgs) {
        super(args);
        this._value = value;
    }

    get returnType(): ExpressionReturnType {
        throw new Error("Method not implemented.");
    }
    get value(): any {
        throw new Error("Method not implemented.");
    }
    public graphviz(): string {
        return `
            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}
        `
    }

    public getGraphvizNode(): string {
        return this._value.getGraphvizNode()
    }

    public getGrahpvizLabel(): string {
        return this._value.getGrahpvizLabel()
    }
    public getGrahpvizEdges(): string {
        return this._value.getGrahpvizEdges()
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }


}