import { Statement, StatementArgs } from "../";
import { VariableType } from "../../elements";
import { Expression } from "../expression";


type VariableDeclarationArgs = StatementArgs & {
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
        throw new Error("Method not implemented.");
    }
    public getGrahpvizLabel(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizEdges(): string {
        throw new Error("Method not implemented.");
    }
    public evaluate() {

        // context

        throw new Error("Method not implemented.");
    }
}