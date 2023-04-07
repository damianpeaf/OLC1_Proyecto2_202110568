import { Symbols } from './Symbol';

export type VariableArgs = {
    name: string;
    value?: any;
    type: string;
}

export abstract class Variable {

    public name: string;
    public value: any;
    public type: string;

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
