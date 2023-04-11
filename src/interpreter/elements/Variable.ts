import { Context } from '../context';
import { Symbols, TypeWiseValueType } from './Symbol';

export type VariableArgs = {
    name: string;
    value?: any;
    type: TypeWiseValueType;
    context: Context;
    line: number;
    column: number;
}

export abstract class Variable {

    public name: string;
    public type: TypeWiseValueType;
    public _value: any;
    public context: Context
    public line: number;
    public column: number;

    constructor({
        name,
        value = Symbols.NULL,
        type,
        context,
        line,
        column
    }: VariableArgs) {
        this.name = name;
        this._value = value;
        this.type = type;
        this.context = context;
        this.line = line;
        this.column = column;
    }

    set value(value: any) {
        this._value = value;
    }

    get value() {
        return this._value;
    }
}
