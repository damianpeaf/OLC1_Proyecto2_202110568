import { Main, Statement, Structure } from "../statements";
import { SubroutineCall, SubroutineDeclaration } from "../statements/subroutines";
import { Node, NodeArgs } from "./";

export type RootArgs = NodeArgs & {
    stmts: Statement[];
};

export class Root extends Node {

    public stmts: Statement[];

    public main: Main[] = [];

    public constructor({ stmts, ...args }: RootArgs) {
        super(args);
        this.stmts = stmts;
    }

    public graphviz(): string {

        const stmtsGraphs = this.stmts.map(stmt => stmt.graphviz()).join('\n');

        return `
            digraph G {

            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}
            ${stmtsGraphs}

            }
        `
    }
    public getGrahpvizLabel(): string {
        return 'Root'
    }
    public getGrahpvizEdges(): string {
        return this.stmts.map(stmt => `${this.getGraphvizNode()} -> ${stmt.getGraphvizNode()};`).join('\n');
    }
    public evaluate() {
        this.evalGlobalState();
    }

    evalGlobalState() {
        // Search for subrotuines declarations
        this.stmts.map(stmt => {
            if (stmt instanceof SubroutineDeclaration) {
                stmt.evaluate();
            }
        })

        // Search for main
        this.stmts.forEach(stmt => {
            if (stmt instanceof Main) {
                this.main.push(stmt);

                // Evaluate all statements except subrotuines calls and declarations
            } else if (!(stmt instanceof SubroutineCall) && !(stmt instanceof SubroutineDeclaration)) {
                stmt.evaluate();
            }
        })

        // Main validation

        if (this.main.length > 1) {
            this.context.errorTable.addError({
                message: 'Multiples declaraciones de main',
                line: this.main[1].line,
                column: this.main[1].column,
                type: 'Semantico'
            })
        } else if (this.main.length == 0) {
            this.context.errorTable.addError({
                message: 'No se ha declarado main',
                line: 0,
                column: 0,
                type: 'Semantico'
            })
        } else {
            this.main[0].evaluate();
        }
    }

}