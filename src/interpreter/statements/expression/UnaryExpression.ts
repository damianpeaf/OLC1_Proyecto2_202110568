import { Expression, ExpressionArgs } from "./Expression";

export type UnaryExpressionArgs = ExpressionArgs & {
    operand: Expression;
}

export abstract class UnaryExpression extends Expression {

    public operand: Expression;

    constructor({ operand, ...args }: UnaryExpressionArgs) {
        super(args);
        this.operand = operand;
    }
}