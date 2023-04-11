import { Variable, Subroutine } from "../../elements";
import { GlobalScope, Scope } from "./"

export type LocalScopeType = "subroutine" | "function" | "if" | 'else-if' | 'else' | "while" | "for" | "switch" | "case" | "default" | "do-while"

export class LocalScope extends Scope {
    reset(): void {
        this.variables = new Map()
        this.subroutines = new Map()

        if (this.next) {
            this.next = null
        }
    }

    public previous: Scope;
    public next: Scope | null;

    constructor(type: LocalScopeType, previous: Scope, id: number) {
        super(type, id)
        this.next = null
        this.previous = previous
    }

    graphviz(): string {

        return `
        subgraph cluster_${this.id} {
            label = "${this.name}"
            ${this.nodesDefinition()}

            ${this.next ? this.next.graphviz() : ''}

            ${(this.next) ? `N${this.id} -> N${this.next.id} [ltail=cluster_${this.id} lhead=cluster_${this.next.id}]` : ''}
        }
        `
    }

    private getAccessableVariable(): Map<string, Variable> {

        const accessable = new Map()

        // Add the variables from current scope
        this.variables.forEach((value, key) => {
            accessable.set(key, value)
        })

        // Add the variables from previous scope up to global scope
        let aux = this.previous

        while (true) {
            if (aux === null) break

            aux.variables.forEach((value, key) => {
                accessable.set(key, value)
            })


            if (aux instanceof GlobalScope) {
                break
            } else if (aux instanceof LocalScope) {
                aux = aux.previous
            } else {
                throw new Error("Unexpected scope type")
            }
        }

        return accessable
    }

    private getAccessableSubroutine(): Map<string, Subroutine> {

        const accessable = new Map()

        // Add the subroutines from current scope

        this.subroutines.forEach((value, key) => {
            accessable.set(key, value)
        })

        // Add the subroutines from previous scope up to global scope

        let aux = this.previous

        while (true) {
            if (aux === null) break

            aux.subroutines.forEach((value, key) => {
                accessable.set(key, value)
            })

            if (aux instanceof GlobalScope) {
                break
            } else if (aux instanceof LocalScope) {
                aux = aux.previous
            } else {
                throw new Error("Unexpected scope type")
            }

        }

        return accessable
    }

    getVariable(name: string): Variable | null {
        const accessable = this.getAccessableVariable()
        return accessable.get(name) || null
    }

    getSubroutine(name: string): Subroutine | null {
        const accessable = this.getAccessableSubroutine()
        return accessable.get(name) || null
    }
    variableExists(name: string): boolean {
        const accessable = this.getAccessableVariable()
        return accessable.has(name)
    }
    subroutineExists(name: string): boolean {
        const accessable = this.getAccessableSubroutine()
        return accessable.has(name)
    }

    public addScope(local: LocalScope) {
        local.previous = this
        local.next = this.next
        this.next = local
    }
}