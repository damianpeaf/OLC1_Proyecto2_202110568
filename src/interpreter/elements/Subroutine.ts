import { Variable, TypeWiseValueType, Argument, Symbols, isPrimitiveType, isVectorType, getPrimitiveType, isListType } from ".";
import { Builder } from "../ast";
import { Context, Returnable } from "../context";
import { Scope } from "../context/scope-trace";
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
    context: Context,
    parentScope?: Scope,
    line: number,
    column: number
}

export class Subroutine implements Returnable {

    public name: string;
    public type: SubroutineT;
    public parameters: Argument[];
    public returnType: TypeWiseValueType;
    public body: Statement[]
    public object: Object | null;
    public context: Context;
    public parentScope: Scope;

    public return: boolean;
    public returnValue: any;
    public returnValueType: TypeWiseValueType;

    public line: number;
    public column: number;

    constructor({ name, type, parameters, returnType, body, object = null, context, parentScope, line, column }: SubroutineArgs) {
        this.name = name;
        this.type = type;
        this.parameters = parameters;
        this.returnType = returnType;
        this.body = body;
        this.object = object;
        this.context = context;
        this.parentScope = parentScope || context.scopeTrace.globalScope;

        this.return = false;
        this.returnValue = null;
        this.returnValueType = Symbols.NULL;

        this.line = line
        this.column = column
    }

    public call(args: Expression[], source: Statement): any {


        const validArgs = this.validateParameters(args, source);

        if (!validArgs) {
            return;
        }

        // create new scope in scope of the subroutine declaration
        const prevExecutionScope = this.context.scopeTrace.currentScope;
        this.context.scopeTrace.setCurrentScope(this.parentScope);

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
                    line: arg.line,
                    column: arg.column
                })
            } else if (isVectorType(arg.returnType)) {
                argumentVariable = Builder.element.vector({
                    value: arg.value,
                    name: parameter.name,
                    primitive: getPrimitiveType(arg.returnType),
                    line: arg.line,
                    column: arg.column
                })

            } else if (isListType(arg.returnType)) {
                argumentVariable = Builder.element.list({
                    value: arg.value,
                    name: parameter.name,
                    primitive: getPrimitiveType(arg.returnType),
                    line: arg.line,
                    column: arg.column
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

                this.return = true;
                this.returnValue = Symbols.NULL;
                return
            }
            scope.addVariable(argumentVariable)
        }

        // add subroutine to call stack
        this.context.callStack.push(this);
        this.return = false;
        this.returnValue = null;
        this.returnValueType = Symbols.NULL;

        // execute body
        for (let i = 0; i < this.body.length; i++) {
            const stmt = this.body[i];
            stmt.evaluate();

            if (this.return) {
                break;
            }
        }

        // reset scope
        this.context.scopeTrace.setCurrentScope(prevExecutionScope);

        // remove subroutine from call stack
        if (this.context.callStack.in(this)) {
            this.context.callStack.remove(this);
        }

        this.validateReturn(source);
    }

    private validateReturn(source: Statement) {

        if (this.type === 'function' && (!this.return || this.returnValueType !== this.returnType)) {
            this.context.errorTable.addError({
                message: `La subrutina ${this.name} debe retornar un valor de tipo ${this.returnType}`,
                column: source.column,
                line: source.line,
                type: 'Semantico'
            })
        }

        if (this.type === 'method' && this.return && this.returnValueType !== Symbols.VOID) {
            this.context.errorTable.addError({
                message: `La subrutina ${this.name} no debe retornar un valor`,
                column: source.column,
                line: source.line,
                type: 'Semantico'
            })
        }

        if (this.type === 'method' && !this.return) {
            this.returnValue = Symbols.VOID;
            this.returnValueType = Symbols.VOID;
        }
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
                    message: `El argumento ${i + 1} de la subrutina ${this.name} puede ser del tipo ${parameterType.join(", ")}. Se ha proporcionado un argumento de tipo ${argType}`,
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