

// TODO: Add support for arrays
export type VariableType = "INT" | "DOUBLE" | "STRING" | "BOOLEAN" | "CHAR"

export class Variable {

    public name: string;
    public type: VariableType;
    public value: any;

    constructor(name: string, type: VariableType, value: any) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

}