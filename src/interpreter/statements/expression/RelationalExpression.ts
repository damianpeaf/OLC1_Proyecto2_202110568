import { Symbols, TypeWiseValueType } from "../../elements";
import { BinaryExpression, BinaryExpressionArgs } from "./";
import { charToNumber } from "./cast/cast";
import { BinaryStrategy, evalBinaryStrategy } from "./strategys/BinaryStrategy";


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

    private _v: any
    private _t: TypeWiseValueType
    constructor({ ...args }: RelationalExpressionArgs) {
        super(args);
    }

    get returnType(): TypeWiseValueType {
        return this._t
    }
    get value(): any {
        return this._v
    }

    public evaluate() {
        let result: {
            value: any,
            type: TypeWiseValueType
        }

        switch (this.operator) {
            case RelationalExpresionType.EQUALS:
                result = evalBinaryStrategy(strats.EQUALS, (a, b) => a === b, this);
                break;
            case RelationalExpresionType.NOT_EQUAL:
                result = evalBinaryStrategy(strats.NOT_EQUAL, (a, b) => a !== b, this);
                break;
            case RelationalExpresionType.LESS_THAN:
                result = evalBinaryStrategy(strats.LESS_THAN, (a, b) => a < b, this);
                break;
            case RelationalExpresionType.LESS_THAN_OR_EQUAL:
                result = evalBinaryStrategy(strats.LESS_THAN_OR_EQUAL, (a, b) => a <= b, this);
                break;
            case RelationalExpresionType.GREATER_THAN:
                result = evalBinaryStrategy(strats.GREATER_THAN, (a, b) => a > b, this);
                break;
            case RelationalExpresionType.GREATER_THAN_OR_EQUAL:
                result = evalBinaryStrategy(strats.GREATER_THAN_OR_EQUAL, (a, b) => a >= b, this);
                break;
            default:
                throw new Error(`Operator ${this.operator} not implemented`);
        }

        // False by default
        this._t = result.type == null ? Symbols.BOOLEAN : result.type;
        this._v = result.value == null ? false : result.value;

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

// EQUALS & NOT_EQUAL for strings, numbers, booleans, chars
// LESS_THAN & GREATER_THAN & LESS_THAN_OR_EQUAL & GREATER_THAN_OR_EQUAL just for numbers and chars

const generateEqualNotEqualStrategy = (op: (a: any, b: any) => boolean) => {
    return [
        new BinaryStrategy({
            firstType: Symbols.STRING,
            secondType: Symbols.STRING,
            returnType: Symbols.BOOLEAN,
        }),
        new BinaryStrategy({
            firstType: Symbols.STRING,
            secondType: Symbols.CHAR,
            returnType: Symbols.BOOLEAN,
        }),
        new BinaryStrategy({
            firstType: Symbols.BOOLEAN,
            secondType: Symbols.BOOLEAN,
            returnType: Symbols.BOOLEAN,
        }),
        ...generateLessGraterThanStrategy(op)
    ]
}

const generateLessGraterThanStrategy = (op: (a: any, b: any) => boolean) => {
    return [
        new BinaryStrategy({
            firstType: Symbols.INT,
            secondType: Symbols.INT,
            returnType: Symbols.BOOLEAN,
        }),
        new BinaryStrategy({
            firstType: Symbols.INT,
            secondType: Symbols.DOUBLE,
            returnType: Symbols.BOOLEAN,
        }),
        new BinaryStrategy({
            firstType: Symbols.INT,
            secondType: Symbols.CHAR,
            returnType: Symbols.BOOLEAN,
            operation: charToNumber(op)
        }),
        new BinaryStrategy({
            firstType: Symbols.DOUBLE,
            secondType: Symbols.DOUBLE,
            returnType: Symbols.BOOLEAN,
        }),
        new BinaryStrategy({
            firstType: Symbols.DOUBLE,
            secondType: Symbols.CHAR,
            returnType: Symbols.BOOLEAN,
            operation: charToNumber(op)
        }),
        new BinaryStrategy({
            firstType: Symbols.CHAR,
            secondType: Symbols.CHAR,
            returnType: Symbols.BOOLEAN,
        }),
    ]
}

const strats = {
    EQUALS: generateEqualNotEqualStrategy((a, b) => a === b),
    NOT_EQUAL: generateEqualNotEqualStrategy((a, b) => a !== b),
    LESS_THAN: generateLessGraterThanStrategy((a, b) => a < b),
    LESS_THAN_OR_EQUAL: generateLessGraterThanStrategy((a, b) => a <= b),
    GREATER_THAN: generateLessGraterThanStrategy((a, b) => a > b),
    GREATER_THAN_OR_EQUAL: generateLessGraterThanStrategy((a, b) => a >= b),
}