import { ExpressionReturnType, BinaryExpression, BinaryExpressionArgs } from "./";


type RelationalExpresionT =
    "EQUALS" |
    "NOT_EQUAL" |
    "LESS_THAN" |
    "LESS_THAN_OR_EQUAL" |
    "GREATER_THAN" |
    "GREATER_THAN_OR_EQUAL";

export type RelationalExpressionArgs = BinaryExpressionArgs<RelationalExpresionT> & {
}

export class RelationalExpression extends BinaryExpression<RelationalExpresionT> {

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

export class RelationalExpresionType {
    public static readonly EQUALS = "EQUALS";
    public static readonly NOT_EQUAL = "NOT_EQUAL";
    public static readonly LESS_THAN = "LESS_THAN";
    public static readonly LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL";
    public static readonly GREATER_THAN = "GREATER_THAN";
    public static readonly GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL";
}