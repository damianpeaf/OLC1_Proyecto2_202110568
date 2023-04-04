

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

export class Type {

    public static readonly INT: VariableType = "INT";
    public static readonly DOUBLE: VariableType = "DOUBLE";
    public static readonly STRING: VariableType = "STRING";
    public static readonly BOOLEAN: VariableType = "BOOLEAN";
    public static readonly CHAR: VariableType = "CHAR";
}