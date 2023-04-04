import { Statement } from "../statements";
import { Argument } from "../statements/subroutines";
import { NullType, VoidType } from "./Symbol";
import { VariableType } from "./Variable";


export type SubroutineType = "method" | "function"

export type SubroutineArgs = {
    name: string,
    type: SubroutineType,
    parameters: Argument[],
    returnType: VariableType | VoidType | NullType,
    body: Statement[]
}

export class Subroutine {

    public name: string;
    public type: SubroutineType;
    public parameters: Argument[];
    public returnType: VariableType | VoidType | NullType;
    public body: Statement[]

    constructor({ name, type, parameters, returnType, body }: SubroutineArgs) {
        this.name = name;
        this.type = type;
        this.parameters = parameters;
        this.returnType = returnType;
        this.body = body;
    }

}