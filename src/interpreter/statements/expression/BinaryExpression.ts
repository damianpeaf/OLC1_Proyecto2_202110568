import { VariableType } from "../../elements";
import { Statement, StatementArgs } from "../Statement";
import { SymbolType } from '../../elements/Symbol';
import { Expression } from "./Expression";

export type BinaryExpressionReturnType = VariableType | SymbolType;

export type BinaryExpressionArgs<SubType> = StatementArgs & {
    subType: SubType;
    left: BinaryExpression<any>;
    right: BinaryExpression<any>;
}

export abstract class BinaryExpression<SubType> extends Expression {

    public subType: SubType;
    public left: BinaryExpression<any>;
    public right: BinaryExpression<any>;

    constructor({ subType, left, right, ...args }: StatementArgs & BinaryExpressionArgs<SubType>) {
        super(args);

        this.subType = subType as SubType
        this.left = left;
        this.right = right;
    }

}
