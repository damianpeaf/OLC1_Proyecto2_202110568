import { Variable, TypeWiseValueType, Argument, Symbols, isPrimitiveType, isVectorType, getPrimitiveType, isListType } from ".";
import { Builder } from "../ast";
import { Context } from "../context";
import { Statement } from "../statements";
import { Expression } from "../statements/expression";

export type SubroutineT = "method" | "function"

export type SubroutineArgs = {
    name: string,
    type: SubroutineT,
    parameters: Argument[],
    returnType: TypeWiseValueType,
    body: Statement[],
    object?: Object | null,
    context: Context
}

export class Subroutine {

    public name: string;
    public type: SubroutineT;
    public parameters: Argument[];
    public returnType: TypeWiseValueType;
    public body: Statement[]
    public object: Object | null;
    public context: Context;

    constructor({ name, type, parameters, returnType, body, object = null, context }: SubroutineArgs) {
        this.name = name;
        this.type = type;
        this.parameters = parameters;
        this.returnType = returnType;
        this.body = body;
        this.object = object;
        this.context = context;
    }

    public call(args: Expression[], source: Statement): any {

        const validArgs = this.validateParameters(args, source);

        if (!validArgs) {
            return Symbols.NULL;
        }

        // create new scope
        const scope = this.context.scopeTrace.newScope({ reason: 'subroutine' });

        // add parameters to scope
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const parameter = this.parameters[i];

            let argumentVariable: Variable;

            if (isPrimitiveType(arg.returnType)) {
                argumentVariable = Builder.element.primitive({
                    value: arg.value,
                    type: arg.returnType,
                    name: parameter.name,
                })
            } else if (isVectorType(arg.returnType)) {
                argumentVariable = Builder.element.vector({
                    value: arg.value,
                    name: parameter.name,
                    primitive: getPrimitiveType(arg.returnType)
                })

            } else if (isListType(arg.returnType)) {
                argumentVariable = Builder.element.list({
                    value: arg.value,
                    name: parameter.name,
                    primitive: getPrimitiveType(arg.returnType)
                })
            } else {
                throw new Error(`Argument type ${arg.returnType} not supported`)
            }

            const exists = scope.getVariable(parameter.name);

            if (exists) {
                this.context.errorTable.addError({
                    message: `El argumento ${parameter.name} ya existe en el ámbito actual`,
                    column: arg.column,
                    line: arg.line,
                    type: 'Semantico'
                })

                return Symbols.NULL;
            }
            scope.addVariable(argumentVariable)
        }

        // execute body
        for (let i = 0; i < this.body.length; i++) {
            const stmt = this.body[i];
            const value = stmt.evaluate();

            if (value) {
                if (value.type == 'return') {
                    return value.value;
                }
            }
        }

        // return null if no return statement
        return null;
    }

    public validateParameters(args: Expression[], source: Statement): boolean {
        // args size
        if (args.length != this.parameters.length) {
            this.context.errorTable.addError({
                message: `La subrutina ${this.name} requiere ${this.parameters.length} argumentos, se han proporcionado ${args.length}`,
                column: source.column,
                line: source.line,
                type: 'Semantico'
            })
            return false;
        }


        // args type

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const parameter = this.parameters[i];

            arg.evaluate();
            const argType = arg.returnType;
            const parameterType = parameter.type;

            if (!parameterType.includes(argType)) {
                this.context.errorTable.addError({
                    message: `El argumento ${i} de la subrutina ${this.name} puede ser del tipo ${parameterType.join(", ")}. Se ha proporcionado un argumento de tipo ${argType}`,
                    column: arg.column,
                    line: arg.line,
                    type: 'Semantico'
                })
                return false;
            }
        }


        return true;
    }

}

export class SubroutineType {
    static METHOD: SubroutineT = "method"
    static FUNCTION: SubroutineT = "function"
}