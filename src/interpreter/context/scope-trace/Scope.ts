import { Subroutine, Variable } from "../../elements";
import { graphviz } from 'd3-graphviz';


export abstract class Scope {

    public variables: Map<string, Variable>;
    public subroutines: Map<string, Subroutine>
    public name: string;
    public id: number;

    constructor(name: string, id: number) {
        this.variables = new Map();
        this.subroutines = new Map();
        this.name = name;
        this.id = id;
    }

    public addVariable(variable: Variable) {
        this.variables.set(variable.name, variable);
    }

    public addSubroutine(subroutine: Subroutine) {
        this.subroutines.set(subroutine.name, subroutine);
    }

    abstract getVariable(name: string): Variable | null;
    abstract getSubroutine(name: string): Subroutine | null;

    abstract variableExists(name: string): boolean;
    abstract subroutineExists(name: string): boolean;

    abstract reset(): void;

    public nodeLabel(): string {
        return `
        <table border="1" cellborder="1" cellspacing="0" cellpadding="4">
            <tr>
                <td bgcolor="lightgrey" colspan="4"><b>Variables</b></td>
            </tr>
           
            ${this.variables.size > 0
                ?
                ` 
                <tr>
                    <td>Identificador</td>
                    <td>Tipo</td>
                    <td>Linea</td>
                    <td>Columna</td>
                </tr>\n`+
                Array.from(this.variables.values()).map(variable => `
                <tr>
                    <td>${variable.name}</td>
                    <td>${variable.type}</td>
                    <td>${variable.line}</td>
                    <td>${variable.column}</td>
                </tr>
            `).join('')
                : `<tr><td colspan="4"> - </td></tr>`
            }
            <tr>
                <td bgcolor="lightgrey" colspan="4"><b>Subrutinas</b></td>
            </tr>
            ${this.subroutines.size > 0
                ?
                ` 
                <tr>
                    <td>Identificador</td>
                    <td>Tipo</td>
                    <td>Linea</td>
                    <td>Columna</td>
                </tr>\n`+
                Array.from(this.subroutines.values()).map(subroutine => `
                <tr>
                    <td>${subroutine.name}</td>
                    <td>${subroutine.type} ${subroutine.type !== 'method' ? subroutine.returnType : ''}</td>
                    <td>${subroutine.line}</td>
                    <td>${subroutine.column}</td>
                </tr>
            `).join('')
                : `<tr><td colspan="4"> - </td></tr>`
            }
        </table>
        `
    }


    public nodesDefinition() {
        return `N${this.id} [ label=< ${this.nodeLabel()} > ];
        `
    }

    abstract graphviz(): string;
}