import { BinaryExpression, BinaryExpressionArgs, ExpressionReturnType } from './';

export type ArithmeticExpressionT =
    "PLUS" |
    "MINUS" |
    "TIMES" |
    "DIVIDE" |
    "MOD" |
    "POWER"
    ;


export type ArithmeticExpressionArgs = BinaryExpressionArgs<ArithmeticExpressionT> & {
}

export class ArithmeticExpression extends BinaryExpression<ArithmeticExpressionT> {

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

export class ArithmeticExpressionType {
    public static readonly PLUS: ArithmeticExpressionT = "PLUS";
    public static readonly MINUS: ArithmeticExpressionT = "MINUS";
    public static readonly TIMES: ArithmeticExpressionT = "TIMES";
    public static readonly DIVIDE: ArithmeticExpressionT = "DIVIDE";
    public static readonly MOD: ArithmeticExpressionT = "MOD";
    public static readonly POWER: ArithmeticExpressionT = "POWER";
}