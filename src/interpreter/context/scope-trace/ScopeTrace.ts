import { GlobalScope, Scope, LocalScopeType, LocalScope } from "."
import { Subroutine, Variable } from "../../elements"
import { graphviz } from 'd3-graphviz';

export type NewScopeRequest = {
    reason: LocalScopeType
}

export class ScopeTrace {

    public globalScope: GlobalScope
    public currentScope: Scope
    private scopeCounter: number

    constructor() {
        this.globalScope = new GlobalScope()
        this.currentScope = this.globalScope
        this.scopeCounter = 1;
    }

    public newScope({ reason }: NewScopeRequest) {
        if (this.currentScope instanceof GlobalScope) {
            const newScope = new LocalScope(reason, this.globalScope, this.scopeCounter++)
            this.globalScope.addLocal(newScope)
            this.currentScope = newScope
            return newScope
        } else if (this.currentScope instanceof LocalScope) {
            const newScope = new LocalScope(reason, this.currentScope, this.scopeCounter++)
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

    public setCurrentScope(scope: Scope) {
        this.currentScope = scope
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

    get graphviz() {
        return `
            digraph G {

            node [shape=none];
            rankdir=TB;
            
            ${this.globalScope.graphviz()}

            }
        `
    }
}