import { Scope, LocalScope } from "./";
import { Variable, Subroutine } from "../../elements";

export class GlobalScope extends Scope {

    public locals: Scope[]

    constructor() {
        super('global')
        this.locals = []
    }

    getVariable(name: string): Variable | null {
        return this.variables.get(name) || null
    }
    getSubroutine(name: string): Subroutine | null {
        return this.subroutines.get(name) || null
    }
    variableExists(name: string): boolean {
        return this.variables.has(name)
    }
    subroutineExists(name: string): boolean {
        return this.subroutines.has(name)
    }

    addLocal(local: LocalScope) {
        this.locals.push(local)
    }

}