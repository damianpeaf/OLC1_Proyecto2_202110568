import { Subroutine, SubroutineT, TypeWiseValueType } from "../../elements";
import { Structure, StructureArgs } from "../Structure";
import { Argument } from './Argument';


export type SubroutineDeclarationArgs = StructureArgs & {
    name: string;
    args: Argument[];
    type: SubroutineT;
    returnType: TypeWiseValueType;
}


export class SubroutineDeclaration extends Structure {

    private name: string;
    private args: Argument[];
    private type: SubroutineT;
    private returnType: TypeWiseValueType;

    constructor({ name, args, type, returnType, ...stmtArgs }: SubroutineDeclarationArgs) {
        super(stmtArgs);

        this.name = name;
        this.args = args;
        this.type = type;
        this.returnType = returnType;
    }


    public getGrahpvizLabel(): string {
        return `Declaración de subrutina: ${this.name}`;
    }
    public getGrahpvizEdges(): string {
        return `
            ${this.linkStatements(this.args)}
        `
    }
    public evaluate() {

        const subroutine = new Subroutine({
            name: this.name,
            type: this.type,
            parameters: this.args,
            returnType: this.returnType,
            body: this.statements,
            context: this.context,
            parentScope: this.context.scopeTrace.currentScope
        })

        this.context.scopeTrace.currentScope.addSubroutine(subroutine);
    }


}