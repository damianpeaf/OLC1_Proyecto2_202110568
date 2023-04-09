import { PrimitiveT, Symbols, TypeWiseValueType } from "../../elements";
import { StatementArgs } from "../Statement";
import { Value } from "../value";
import { Expression } from "./Expression";

export type CastArgs = StatementArgs & {
    value: Expression;
    type: PrimitiveT;
}

export class Cast extends Value {


    private valueToConvert: Expression;
    private conversionType: PrimitiveT;

    private _v: any;
    private _t: TypeWiseValueType;

    constructor({ value, type, ...args }: CastArgs) {
        super(args);
        this.valueToConvert = value;
        this.conversionType = type;
    }

    public getGrahpvizLabel(): string {
        return `Cast: ${this.type}`;
    }
    public getGrahpvizEdges(): string {
        return `
            ${this.linkStatement(this.valueToConvert)}
        `
    }

    get type(): TypeWiseValueType {
        return this._t;
    }
    get value(): any {
        return this._v;
    }

    // Possible conversions:
    // Int a double
    // Int a String
    // Int a Char

    // Double a Int
    // Double a String

    // Char a double
    // Char a Int
    public evaluate() {
        this.valueToConvert.evaluate();
        const originalType = this.valueToConvert.returnType;
        const originalValue = this.valueToConvert.value;

        // Same type cast
        if (originalType === this.conversionType) {
            this._v = originalValue;
            this._t = originalType;
            return;
        }

        // Null cast
        if (originalType === Symbols.NULL) {
            this._v = null;
            this._t = Symbols.NULL;
            return;
        }

        // Soported casts
        if (originalType === Symbols.INT) {

            if (this.conversionType === Symbols.DOUBLE) {
                this._v = Number(originalValue);
                this._t = Symbols.DOUBLE;
                return;
            }

            if (this.conversionType === Symbols.STRING) {
                this._v = originalValue.toString();
                this._t = Symbols.STRING;
                return;
            }

            if (this.conversionType === Symbols.CHAR) {
                this._v = String.fromCharCode(originalValue);
                this._t = Symbols.CHAR;
                return;
            }

        }

        if (originalType === Symbols.DOUBLE) {

            if (this.conversionType === Symbols.INT) {
                this._v = Math.floor(originalValue);
                this._t = Symbols.INT;
                return;
            }

            if (this.conversionType === Symbols.STRING) {
                this._v = originalValue.toString();
                this._t = Symbols.STRING;
                return;
            }

        }


        if (originalType === Symbols.CHAR) {

            if (this.conversionType === Symbols.DOUBLE) {
                this._v = Number(originalValue.charCodeAt(0));
                this._t = Symbols.DOUBLE;
                return;
            }

            if (this.conversionType === Symbols.INT) {
                this._v = originalValue.charCodeAt(0);
                this._t = Symbols.INT;
                return;
            }
        }


        this.context.errorTable.addError({
            column: this.column,
            line: this.line,
            message: `No se puede realizar el casteo de ${originalType} a ${this.conversionType}`,
            type: 'Semantico'
        })

        this._v = null;
        this._t = Symbols.NULL;
    }
}