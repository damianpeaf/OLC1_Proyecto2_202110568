import { Variable, TypeWiseValueType, Argument } from ".";
import { Statement } from "../statements";
import { Expression } from "../statements/expression";

export type SubroutineT = "method" | "function"

export type SubroutineArgs = {
    name: string,
    type: SubroutineT,
    parameters: Argument[],
    returnType: TypeWiseValueType,
    body: Statement[],
    object?: Object | null
}

export class Subroutine {

    public name: string;
    public type: SubroutineT;
    public parameters: Argument[];
    public returnType: TypeWiseValueType;
    public body: Statement[]
    public object: Object | null;

    constructor({ name, type, parameters, returnType, body, object = null }: SubroutineArgs) {
        this.name = name;
        this.type = type;
        this.parameters = parameters;
        this.returnType = returnType;
        this.body = body;
        this.object = object;
    }

    public call(args: Expression[]): Variable {
        this.validateParameters(args);
        throw new Error("Not implemented");
    }

    private validateParameters(args: Expression[]): void {
        throw new Error("Not implemented");
    }

}

export class SubroutineType {
    static METHOD: SubroutineT = "method"
    static FUNCTION: SubroutineT = "function"
}