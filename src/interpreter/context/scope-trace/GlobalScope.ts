import { Scope, LocalScope } from "./";
import { Variable, Subroutine } from "../../elements";

export class GlobalScope extends Scope {


    public locals: Scope[]

    constructor() {
        super('global', 0)
        this.locals = []
    }

    reset(): void {
    }
    graphviz(): string {

        return `
            subgraph cluster_${this.id} {
                label = "${this.name}"

                ${this.nodesDefinition()}

                ${this.locals.map(l => l.graphviz()).join('\n')}


                ${this.locals.map(l => `N${this.id} -> N${l.id} [ltail=cluster_${this.id} lhead=cluster_${l.id}]`).join('\n')}

            }
        `
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