import { Variable, VariableArgs, Subroutine } from '.';

export type ObjectArgs = VariableArgs & {
    type: string;
}

export class Object extends Variable {

    public type: string;
    public properties: Map<string, Variable> = new Map();
    public methods: Map<string, Subroutine> = new Map();

    constructor({
        type,
        ...args
    }: ObjectArgs) {
        super(args);
        this.type = type;
    }

}