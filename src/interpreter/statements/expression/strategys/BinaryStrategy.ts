import { Symbols, TypeWiseValueType } from "../../../elements";
import { BinaryExpression } from '..';


interface BinaryStrategyArgs {
    firstType: TypeWiseValueType,
    secondType: TypeWiseValueType,
    returnType: TypeWiseValueType,
    operation?: ((a: any, b: any) => any) | null
}


export class BinaryStrategy {

    public firstType: TypeWiseValueType;
    public secondType: TypeWiseValueType;
    public returnType: TypeWiseValueType;
    public operation: ((a: any, b: any) => any) | null;


    constructor({
        firstType,
        secondType,
        returnType,
        operation = null
    }: BinaryStrategyArgs) {
        this.firstType = firstType;
        this.secondType = secondType;
        this.returnType = returnType;
        this.operation = operation;
    }
}


export const evalBinaryStrategy = (strategies: BinaryStrategy[], defaultOperation: (a: any, b: any) => any, expression: BinaryExpression<any>) => {
    expression.left.evaluate();
    const { returnType: leftType, value: leftValue } = expression.left;
    expression.right.evaluate();
    const { returnType: rightType, value: rightValue } = expression.right;
    const strategy = strategies.find(s => (s.firstType === leftType && s.secondType === rightType) || (s.firstType === rightType && s.secondType === leftType));
    if (strategy) {
        return {
            type: strategy.returnType,
            value: strategy.operation ? strategy.operation(leftValue, rightValue) : defaultOperation(leftValue, rightValue)
        }
    } else {
        expression.context.errorTable.addError({
            message: `No es posible realizar la operación ${expression.operator} entre ${leftType} y ${rightType}`,
            line: expression.line,
            column: expression.column,
            type: 'Semantico'
        })
        return {
            type: Symbols.NULL,
            value: null
        }
    }
}