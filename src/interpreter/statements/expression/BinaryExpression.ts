import { VariableType } from "../../elements";
import { Statement, StatementArgs } from "../Statement";
import { SymbolType } from '../../elements/Symbol';
import { Expression } from "./Expression";

export type BinaryExpressionReturnType = VariableType | SymbolType;

export type BinaryExpressionArgs<SubType> = StatementArgs & {
    operator: SubType;
    left: BinaryExpression<any>;
    right: BinaryExpression<any>;
}

export abstract class BinaryExpression<SubType> extends Expression {

    public operator: SubType;
    public left: BinaryExpression<any>;
    public right: BinaryExpression<any>;

    constructor({ operator, left, right, ...args }: StatementArgs & BinaryExpressionArgs<SubType>) {
        super(args);

        this.operator = operator as SubType
        this.left = left;
        this.right = right;
    }

    public getGrahpvizLabel(): string {
        return `Expresion \n Operador: ${this.operator}`;
    }
    public getGrahpvizEdges(): string {
        return `
            ${this.linkStatement(this.left)}
            ${this.linkStatement(this.right)}
        `
    }
}
