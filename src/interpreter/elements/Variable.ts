import { Symbols } from './Symbol';

export type VariableArgs = {
    name: string;
    value?: any;
}

export abstract class Variable {

    public name: string;
    public value: any;

    constructor({
        name,
        value = Symbols.NULL
    }: VariableArgs) {
        this.name = name;
        this.value = value;
    }

}
