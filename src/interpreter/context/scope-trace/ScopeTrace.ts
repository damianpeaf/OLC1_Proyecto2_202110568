import { GlobalScope, Scope, LocalScopeType, LocalScope } from "."
import { Subroutine, Variable } from "../../elements"

export type NewScopeRequest = {
    reason: LocalScopeType
}

export class ScopeTrace {

    public globalScope: GlobalScope
    public currentScope: Scope


    constructor() {
        this.globalScope = new GlobalScope()
        this.currentScope = this.globalScope
    }

    public newScope({ reason }: NewScopeRequest) {
        if (this.currentScope instanceof GlobalScope) {
            const newScope = new LocalScope(reason, this.globalScope)
            this.globalScope.addLocal(newScope)
            this.currentScope = newScope
            return newScope
        } else if (this.currentScope instanceof LocalScope) {
            const newScope = new LocalScope(reason, this.currentScope)
            this.currentScope.addScope(newScope)
            this.currentScope = newScope
            return newScope
        } else {
            throw new Error("Unexpected scope type")
        }
    }

    public endScope() {
        if (this.currentScope instanceof GlobalScope) {
            throw new Error("Cannot end global scope")
        } else if (this.currentScope instanceof LocalScope) {
            this.currentScope = this.currentScope.previous
        } else {
            throw new Error("Unexpected scope type")
        }
    }

    public resetScope() {
        this.currentScope = this.globalScope
    }

    getVariable(name: string): Variable | null {
        return this.currentScope.getVariable(name)
    }
    getSubroutine(name: string): Subroutine | null {
        return this.currentScope.getSubroutine(name)
    }
    variableExists(name: string): boolean {
        return this.currentScope.variableExists(name)
    }
    subroutineExists(name: string): boolean {
        return this.currentScope.subroutineExists(name)
    }

    addVariable(variable: Variable) {
        this.currentScope.addVariable(variable)
    }

    addSubroutine(subroutine: Subroutine) {
        this.currentScope.addSubroutine(subroutine)
    }
}