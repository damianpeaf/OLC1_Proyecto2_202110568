import { BinaryExpression, BinaryExpressionArgs, ExpressionReturnType } from '.';

export type LogicalExpressionT =
    "AND" |
    "OR"
    ;


export type LogicalExpressionArgs = BinaryExpressionArgs<LogicalExpressionT> & {
}

export class LogicalExpression extends BinaryExpression<LogicalExpressionT> {

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

export class LogicalExpressionType {
    public static AND: LogicalExpressionT = "AND";
    public static OR: LogicalExpressionT = "OR";
}