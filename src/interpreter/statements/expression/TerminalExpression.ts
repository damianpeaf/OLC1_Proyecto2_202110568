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

type TerminalExpressionArgs = ExpressionArgs & {
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
        throw new Error("Method not implemented.");
    }
    public getGrahpvizLabel(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizEdges(): string {
        throw new Error("Method not implemented.");
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }


}