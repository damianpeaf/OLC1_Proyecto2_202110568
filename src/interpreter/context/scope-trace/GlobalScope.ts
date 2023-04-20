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
                ${this.graphvizChildren()}
               
            }
        `
    }

    graphvizChildren(): string {
        let str = ""
        for (let i = 0; i < this.locals.length; i++) {

            if (i > 20) break // limit the number of children to 30
            str += `
                ${this.locals[i].graphviz()}
                N${this.id} -> N${this.locals[i].id} [ltail=cluster_${this.id} lhead=cluster_${this.locals[i].id}]
            `
        }
        return str
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