import { SubroutineType, SymbolType, VariableType } from "../../elements";
import { Structure, StructureArgs } from "../Structure";
import { Argument } from './Argument';


export type SubroutineDeclarationArgs = StructureArgs & {
    name: string;
    args: Argument[];
    type: SubroutineType;
    returnType: VariableType | SymbolType;
}


export class SubroutineDeclaration extends Structure {

    private name: string;
    private args: Argument[];
    private type: SubroutineType;
    private returnType: VariableType | SymbolType;

    constructor({ name, args, type, returnType, ...stmtArgs }: SubroutineDeclarationArgs) {
        super(stmtArgs);

        this.name = name;
        this.args = args;
        this.type = type;
        this.returnType = returnType;
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
        throw new Error("Method not implemented.");
    }


}