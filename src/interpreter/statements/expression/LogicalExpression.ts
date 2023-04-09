import { BinaryExpression, BinaryExpressionArgs } from '.';
import { Symbols, TypeWiseValueType } from '../../elements';
import { BinaryStrategy, evalBinaryStrategy } from './strategys/BinaryStrategy';

export type LogicalExpressionT =
    "AND" |
    "OR"
    ;


export type LogicalExpressionArgs = BinaryExpressionArgs<LogicalExpressionT> & {
}

export class LogicalExpression extends BinaryExpression<LogicalExpressionT> {

    private _v: any
    private _t: TypeWiseValueType

    constructor({ ...args }: LogicalExpressionArgs) {
        super(args);
    }

    public evaluate() {
        let result: {
            value: any,
            type: TypeWiseValueType
        }

        switch (this.operator) {
            case 'AND':
                result = evalBinaryStrategy(logicalStrategy, (a, b) => a && b, this);
                break;
            case 'OR':
                result = evalBinaryStrategy(logicalStrategy, (a, b) => a || b, this);
                break;
            default:
                throw new Error(`Operator ${this.operator} not implemented`);

        }
        this._t = result.type;
        this._v = result.value;
    }

    get returnType(): TypeWiseValueType {
        return this._t;
    }

    get value(): any {
        return this._v;
    }
}

export class LogicalExpressionType {
    public static AND: LogicalExpressionT = "AND";
    public static OR: LogicalExpressionT = "OR";
}

const logicalStrategy = [
    new BinaryStrategy({
        firstType: Symbols.BOOLEAN,
        secondType: Symbols.BOOLEAN,
        returnType: Symbols.BOOLEAN
    })
]