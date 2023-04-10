import { Context } from '../context';
import { Symbols, TypeWiseValueType } from './Symbol';

export type VariableArgs = {
    name: string;
    value?: any;
    type: TypeWiseValueType;
    context: Context;
}

export abstract class Variable {

    public name: string;
    public type: TypeWiseValueType;
    public _value: any;
    public context: Context

    constructor({
        name,
        value = Symbols.NULL,
        type,
        context
    }: VariableArgs) {
        this.name = name;
        this._value = value;
        this.type = type;
        this.context = context;
    }

    set value(value: any) {
        this._value = value;
    }

    get value() {
        return this._value;
    }
}
