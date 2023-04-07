import { Symbols, TypeWiseValueType } from './Symbol';

export type VariableArgs = {
    name: string;
    value?: any;
    type: TypeWiseValueType;
}

export abstract class Variable {

    public name: string;
    public value: any;
    public type: TypeWiseValueType;

    constructor({
        name,
        value = Symbols.NULL,
        type
    }: VariableArgs) {
        this.name = name;
        this.value = value;
        this.type = type;
    }

}
