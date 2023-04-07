import { Variable, VariableArgs, Subroutine, TypeWiseValueType } from '.';

export type ObjectArgs = VariableArgs & {
    type: TypeWiseValueType;
}

export class Object extends Variable {

    public type: TypeWiseValueType;
    public properties: Map<string, Variable> = new Map();
    public methods: Map<string, Subroutine> = new Map();

    constructor({
        ...args
    }: ObjectArgs) {
        super(args);
        this.type = args.type;
    }

}