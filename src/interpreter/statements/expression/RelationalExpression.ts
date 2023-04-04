import { ExpressionReturnType, BinaryExpression, BinaryExpressionArgs } from "./";


type RelationalExpresionType =
    "EQUALS" |
    "NOT_EQUAL" |
    "LESS_THAN" |
    "LESS_THAN_OR_EQUAL" |
    "GREATER_THAN" |
    "GREATER_THAN_OR_EQUAL";

type RelationalExpressionArgs = BinaryExpressionArgs<RelationalExpresionType> & {
}

export class RelationalExpression extends BinaryExpression<RelationalExpresionType> {

    constructor({ ...args }: RelationalExpressionArgs) {
        super(args);
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