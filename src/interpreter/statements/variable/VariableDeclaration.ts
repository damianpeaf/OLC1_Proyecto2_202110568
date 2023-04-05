import { Statement, StatementArgs } from "../";
import { VariableType } from "../../elements";
import { Expression } from "../expression";


export type VariableDeclarationArgs = StatementArgs & {
    type: VariableType;
    name: string;
    value?: Expression | null;
}

export class VariableDeclaration extends Statement {

    private type: VariableType;
    private name: string;
    private value: any | null;

    constructor({ type, name, value = null, ...stmtArgs }: VariableDeclarationArgs) {
        super(stmtArgs);

        this.name = name;
        this.value = value;
        this.type = type;
    }

    public graphviz(): string {
        return `
            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}
        `
    }
    public getGrahpvizLabel(): string {
        return 'Declaracion de variable'
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode()

        return `
            ${n}T [label="Tipo: ${this.type}"]
            ${n} -> ${n}T

            ${n}N [label="Nombre: ${this.name}"]
            ${n} -> ${n}N

            ${this.value
                ? this.linkStatement(this.value)
                : ''
            }
        `
    }
    public evaluate() {

        // context

        throw new Error("Method not implemented.");
    }
}