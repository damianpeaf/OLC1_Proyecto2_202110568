import { Symbols, TypeWiseValueType } from '../../elements';
import { BinaryExpression, BinaryExpressionArgs } from './';
import { charToNumber } from './cast/cast';
import { BinaryStrategy, evalBinaryStrategy } from './strategys/BinaryStrategy';

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

    private _v: any;
    private _t: TypeWiseValueType;

    constructor({ ...args }: ArithmeticExpressionArgs) {
        super(args);

    }

    public evaluate() {

        let result: {
            value: any,
            type: TypeWiseValueType
        }


        switch (this.operator) {
            case 'PLUS':
                result = evalBinaryStrategy(plusStrategy, (a, b) => a + b, this);
                break;
            case 'MINUS':
                result = evalBinaryStrategy(minusStrategy, (a, b) => a - b, this);
                break;
            case 'TIMES':
                result = evalBinaryStrategy(timesStrategy, (a, b) => a * b, this);
                break;
            case 'DIVIDE':
                result = evalBinaryStrategy(divideStrategy, (a, b) => a / b, this);
                break;
            case 'MOD':
                result = evalBinaryStrategy(modStrategy, (a, b) => a % b, this);
                break;
            case 'POWER':
                result = evalBinaryStrategy(powerStrategy, (a, b) => Math.pow(a, b), this);
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

export class ArithmeticExpressionType {
    public static readonly PLUS: ArithmeticExpressionT = "PLUS";
    public static readonly MINUS: ArithmeticExpressionT = "MINUS";
    public static readonly TIMES: ArithmeticExpressionT = "TIMES";
    public static readonly DIVIDE: ArithmeticExpressionT = "DIVIDE";
    public static readonly MOD: ArithmeticExpressionT = "MOD";
    public static readonly POWER: ArithmeticExpressionT = "POWER";
}


const plusStrategy = [
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.INT,
        returnType: Symbols.INT,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.BOOLEAN,
        returnType: Symbols.INT,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.CHAR,
        returnType: Symbols.INT,
        operation: charToNumber((a, b) => a + b)
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.STRING,
        returnType: Symbols.STRING,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.BOOLEAN,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.CHAR,
        returnType: Symbols.DOUBLE,
        operation: charToNumber((a, b) => a + b)
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.STRING,
        returnType: Symbols.STRING,
    }),
    new BinaryStrategy({
        firstType: Symbols.BOOLEAN,
        secondType: Symbols.STRING,
        returnType: Symbols.STRING,
    }),
    new BinaryStrategy({
        firstType: Symbols.CHAR,
        secondType: Symbols.CHAR,
        returnType: Symbols.STRING,
    }),
    new BinaryStrategy({
        firstType: Symbols.CHAR,
        secondType: Symbols.STRING,
        returnType: Symbols.STRING,
    }),
    new BinaryStrategy({
        firstType: Symbols.STRING,
        secondType: Symbols.STRING,
        returnType: Symbols.STRING,
    }),
]

const minusStrategy = [
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.INT,
        returnType: Symbols.INT,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.BOOLEAN,
        returnType: Symbols.INT,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.CHAR,
        returnType: Symbols.INT,
        operation: charToNumber((a, b) => a - b)
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.BOOLEAN,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.CHAR,
        returnType: Symbols.DOUBLE,
        operation: charToNumber((a, b) => a - b)
    }),
]


const timesStrategy = [
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.INT,
        returnType: Symbols.INT,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.CHAR,
        returnType: Symbols.INT,
        operation: charToNumber((a, b) => a * b)
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.CHAR,
        returnType: Symbols.DOUBLE,
        operation: charToNumber((a, b) => a * b)
    }),
]

const divideStrategy = [
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.INT,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.CHAR,
        returnType: Symbols.DOUBLE,
        operation: charToNumber((a, b) => a / b)
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE,
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.CHAR,
        returnType: Symbols.DOUBLE,
        operation: charToNumber((a, b) => a / b)
    }),
]

const powerStrategy = [
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.INT,
        returnType: Symbols.INT
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE
    })
]

const modStrategy = [
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.INT,
        returnType: Symbols.DOUBLE
    }),
    new BinaryStrategy({
        firstType: Symbols.INT,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE
    }),
    new BinaryStrategy({
        firstType: Symbols.DOUBLE,
        secondType: Symbols.DOUBLE,
        returnType: Symbols.DOUBLE
    })
]