import { BinaryExpression, BinaryExpressionArgs, ExpressionReturnType } from './';

export type ArithmeticExpressionType =
    "PLUS" |
    "MINUS" |
    "TIMES" |
    "DIVIDE" |
    "MOD" |
    "POWER" |
    "UNARY_MINUS"
    ;


export type ArithmeticExpressionArgs = BinaryExpressionArgs<ArithmeticExpressionType> & {
}

export class ArithmeticExpression extends BinaryExpression<ArithmeticExpressionType> {

    constructor({ ...args }: ArithmeticExpressionArgs) {
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