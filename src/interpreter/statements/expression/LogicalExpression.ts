import { BinaryExpression, BinaryExpressionArgs, ExpressionReturnType } from '.';

export type LogicalExpressionType =
    "PLUS" |
    "MINUS" |
    "TIMES" |
    "DIVIDE" |
    "MOD" |
    "POWER" |
    "UNARY_MINUS"
    ;


type LogicalExpressionArgs = BinaryExpressionArgs<LogicalExpressionType> & {
}

export class LogicalExpression extends BinaryExpression<LogicalExpressionType> {

    constructor({ ...args }: LogicalExpressionArgs) {
        super(args);
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

    get returnType(): ExpressionReturnType {
        throw new Error("Method not implemented.");
    }

    get value(): any {
        throw new Error("Method not implemented.");
    }
}