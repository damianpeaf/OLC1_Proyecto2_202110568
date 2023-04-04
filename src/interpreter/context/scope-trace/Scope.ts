import { Subroutine, Variable } from "../../elements";


export abstract class Scope {

    public variables: Map<string, Variable>;
    public subroutines: Map<string, Subroutine>
    public name: string;

    constructor(name: string) {
        this.variables = new Map();
        this.subroutines = new Map();
        this.name = name;
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

}